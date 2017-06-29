angular.module('myApp',['menu'])
  .controller('MainCtrl',function ($scope,$http) {
    //初始化
    var ctrl = this;
    ctrl.data = [];

    //加载数据
    ctrl.load = function () {
      $http({
        method:"GET",
        url:"../../components/menu/data.json?random="+Math.random()
      }).then(
        function success(res) {
          ctrl.data = res.data;
        },
        function error(err) {
        }
      );
    };
  });