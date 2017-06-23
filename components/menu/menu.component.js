//https://www.cn-abs.com/Market/MarketSummary.aspx#
angular
  .module('menu')
  .component('menu',{
    templateUrl: "../../components/menu/menu.template.html",
    controller:['$scope',function ($scope) {
      var ctrl = this;

      //初始化
      ctrl.$onInit = function () {
        // ctrl.onLoad();

        $.ajax({
          url:"../../components/menu/data.json",
          dataType:'json'
        }).done(function (res) {
          ctrl.data = res;
        }).fail(function (err) {
          console.log(err);
        });

      }


    }],
    bindings: {
      data:'=',
      onLoad:'&',
      onChanged:'&'
    }
  });