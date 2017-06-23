//https://www.cn-abs.com/Market/MarketSummary.aspx#
/**
 *
 * http://www.jb51.net/article/114942.htm
 * http://blog.csdn.net/u011068996/article/details/54893258
 * https://segmentfault.com/q/1010000006996410
 * http://blog.csdn.net/lastsweetop/article/details/56285838?locationNum=2&fps=1
 *
 *
 */
angular
  .module('menu')
  .component('menu',{
    templateUrl: "../../components/menu/menu.template.html",
    controller:['$scope',function ($scope) {
      var ctrl = this;

      //初始化
      ctrl.$onInit = function () {
        // ctrl.onLoad();
      }


    }],
    bindings: {
      data:'=',
      onLoad:'&',
      onChanged:'&'
    }
  });