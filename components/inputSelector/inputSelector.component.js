angular
  .module('inputSelector')
  .component('inputSelector',{
    templateUrl: '../../components/inputSelector/inputSelector.template.html',
    controller:['$scope',function ($scope) {
      var ctrl = this;

      ctrl.$onInit = function(){
        ctrl.onLoad();
        $scope.text =  "";
        $scope.label = ctrl.label;
        $scope.timer = null;
        $scope.id = uuid();


        //自定义高度
        setTimeout(function () {
          var $inputSelector = $('[id='+ $scope.id +']'),
            parent = $inputSelector.parent().parent(),
            parentHeight = parent.height(),
            targetHeight = parentHeight * 0.8 + 'px',
            css = {
              "max-height":targetHeight
            };

          $inputSelector.find("[part=allList]").css(css);
          $inputSelector.find("[part=filteredList]").css(css);
        },100);
      };

      $scope.save = function () {
        if($scope.text){
          ctrl.onSave({text:$scope.text});
        }
        // ctrl.datalist.push($scope.text);

      };

      $scope.changed = function () {
        ctrl.onChanged({text:$scope.text})
      };


      //显示过滤列表
      $scope.showFilteredDataList = function (event) {
        var target = event.currentTarget,
          $inputBoxDom = $(target).parent(),
          $filteredListDom = $inputBoxDom.find("[part=filteredList]"),
          $allListDom = $inputBoxDom.find("[part=allList]");

        $allListDom.hide();
        $filteredListDom.show();
        $scope.clearAutoHideTimer();
      };
      //显示全部列表
      $scope.showAllDataList = function (event) {
        if(ctrl.datalist == null || ctrl.datalist == "" || Array.isArray(ctrl.datalist)&&ctrl.datalist.length ==0){
          alert('empty');
          return;
        }

        var target = event.currentTarget,
          $inputBoxDom = $(target).parent(),
          $allListDom = $inputBoxDom.find("[part=allList]"),
          $filteredListDom = $inputBoxDom.find("[part=filteredList]"),
          $hiddenInputDom  = $(target).find('input');

        $hiddenInputDom.focus();
        $filteredListDom.hide();
        $allListDom.show();
        $scope.clearAutoHideTimer();
      };
      
      //遍历列表
      $scope.traverseDataList = function (event) {
        $scope.clearAutoHideTimer();

        var target = event.currentTarget,
          dataSelector = $(target).attr('part') == 'hiddenInput'?'[part=allList]':'[part=filteredList]',
          $inputBoxDom = dataSelector == '[part=allList]'?$(target).parent().parent():$(target).parent(),
          $dataListDom = $inputBoxDom.find(dataSelector),

          keycode = event.keyCode,
          $curr = $dataListDom.find('li.cur-hover-item').length==0?$dataListDom.find('li:first-child'):$dataListDom.find('li.cur-hover-item'),
          $liList = $dataListDom.find('li'),
          amount = $liList.length,
          currIndex = $liList.index($curr),
          prevIndex = currIndex - 1 < 0 ? amount-1 : currIndex -1,
          nextIndex = currIndex + 1 > amount -1 ? 0 : currIndex + 1,
          $prevLiDom = $($liList.get(prevIndex)),
          $nextLiDom = $($liList.get(nextIndex));

        $scope.clearAutoHideTimer();
        if(keycode == '38'){//按下向上箭头
          $curr.removeClass('cur-hover-item');
          $curr = $prevLiDom.addClass('cur-hover-item');

          var parentScrollTop = $dataListDom[0].scrollTop,
            parentHeight      = $dataListDom[0].clientHeight,
            childOffsetTop    = $curr[0].offsetTop,
            childHeight       = $curr[0].clientHeight;

          if(parentScrollTop>childOffsetTop){
            $dataListDom[0].scrollTop = parentScrollTop - childOffsetTop - childHeight;
          }else if(parentHeight+parentScrollTop < childOffsetTop){
            $dataListDom[0].scrollTop =childOffsetTop - parentHeight  + childHeight + childHeight;
          }

        }else if(keycode == '40'){//按下向下箭头
          $curr.removeClass('cur-hover-item');
          $curr = $nextLiDom.addClass('cur-hover-item');

          var parentScrollTop = $dataListDom[0].scrollTop,
            parentHeight      = $dataListDom[0].clientHeight,
            childOffsetTop    = $curr[0].offsetTop,
            childHeight       = $curr[0].clientHeight;

          if(parentScrollTop>childOffsetTop){
            $dataListDom[0].scrollTop = parentScrollTop - childOffsetTop - childHeight;
          }else if(parentHeight+parentScrollTop < childOffsetTop){
            $dataListDom[0].scrollTop =childOffsetTop - parentHeight  + childHeight + childHeight;
          }

        }else if(keycode == '13'){//按下回车键
          $curr = $dataListDom.find('.cur-hover-item');
          $scope.text = $curr.prop('title');
          closeListDom($dataListDom);
          ctrl.onChanged({text:$scope.text});
        }
      };
      //清楚定时器
      $scope.clearAutoHideTimer = function () {
        if($scope.timer !== null&&$scope.timer !== ""){
          clearTimeout($scope.timer);
          $scope.timer=null;
        }
      };
      //更改列表元素样式
      $scope.changeDataItemCls = function (event) {
        $scope.clearAutoHideTimer();

        var target = event.currentTarget,
          $ulDom = $(target).parent();

        $ulDom.find('li.cur-hover-item').removeClass("cur-hover-item");
        $(target).addClass('cur-hover-item');
      };
      //修改选中元素
      $scope.changedData = function (event) {
        $scope.clearAutoHideTimer();

        var target = event.target,
          liDom = event.currentTarget,
          title = liDom.title,
          $listDom = $(liDom).parent().parent();

        if(target.tagName.toLowerCase()=='span'){
          //删除配置项
          // var index = ctrl.datalist.indexOf(title);
          // index!==-1&&(ctrl.datalist.splice(index,1));

          ctrl.onDelete({text:title});
        }else{
          //更换配置项
          $scope.text = title;
          ctrl.onChanged({text:title});

          //关闭列表
          closeListDom($listDom);
        }
      };
      //自动隐藏列表
      $scope.autoHideDataList = function (event) {
        $scope.clearAutoHideTimer();
        var $target = $(event.currentTarget),
          tagName = event.currentTarget.tagName.toLocaleLowerCase(),
          $parent = $target.parent(),
          $dataList = null;

        (tagName=='input')&&($dataList = $target.attr('part') == 'filterInput'?$parent.find('[part=filteredList]'):$parent.parent().find('[part=allList]'))
        ||
        (tagName=='ul')&&($dataList = $parent)
        ||
        (tagName=='div')&&($dataList = $parent.find('[part=allList]'));

        $scope.timer = setTimeout(function () {
          closeListDom($dataList);
        },1000);
      }

      //关闭列表
      function closeListDom($listDom){
        $listDom.hide().find('li.cur-hover-item').removeClass('cur-hover-item');
      }

      //生成UUID唯一码
      function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      }

    }],
    bindings: {
      label:'<',
      datalist:'=',
      onLoad:'&',
      onSave:'&',
      onChanged:'&',
      onDelete:'&'
    }
  });
