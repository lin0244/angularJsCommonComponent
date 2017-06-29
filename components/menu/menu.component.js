//https://www.cn-abs.com/Market/MarketSummary.aspx#
/**
 *
 * http://www.jb51.net/article/114942.htm
 * http://blog.csdn.net/u011068996/article/details/54893258
 * https://segmentfault.com/q/1010000006996410
 * http://blog.csdn.net/lastsweetop/article/details/56285838?locationNum=2&fps=1
 * https://docs.angularjs.org/guide/component
 *
 */
angular
  .module('menu')
  .component('ccMenu',{
    templateUrl: "../../components/menu/menu.template.html",
    controller:['$scope','LOGO',function ($scope,LOGO) {
      var ctrl = this;
      $scope.logo = LOGO;

      //初始化
      ctrl.$onInit = function () {
        ctrl.onLoad();
        $scope.userInfoVisable = false;
      };

      //显示列表
      $scope.showSubList = function (event) {
        var $target = $(event.currentTarget),
          $parent = $target.parent(),
          $secondaryCategoriesDom = $parent.find('[part=secondary_categories]');

        //隐藏用户列表信息
        $scope.userInfoVisable = false;

        //清除已经展开的选项
        Array.from($("[part=primary_category]")).forEach(function (e) {
          e !== $parent[0] && $(e).removeClass('cur').find('[part=secondary_categories]').css({'opacity':0,'display':'none'});
        });

        $parent.hasClass('cur')&&($parent.removeClass('cur'),$secondaryCategoriesDom.css({'opacity':0,'display':'none'}))
        ||
        !$parent.hasClass('cur')&&($parent.addClass('cur'),$secondaryCategoriesDom.css({'opacity':1,'display':'block'}))
      };

      //显示用户信息
      $scope.showUserInfo = function () {
        //清除已经展开的选项
        Array.from($("[part=primary_category]")).forEach(function (e) {
          $(e).removeClass('cur').find('[part=secondary_categories]').css({'opacity':0,'display':'none'});
        });

        $scope.userInfoVisable = !$scope.userInfoVisable;
      }
      
    }],
    bindings: {
      data:'=',
      onLoad:'&',
      onChanged:'&'
    }
  });
