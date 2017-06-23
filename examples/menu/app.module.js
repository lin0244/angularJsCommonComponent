angular.module('myApp',['menu'])
  .controller('MainCtrl',function ($scope) {
    //初始化
    var ctrl = this;
    ctrl.data = {};
      $.ajax({
        url:"../../components/menu/data.json",
        dataType:'json'
      }).done(function (res) {
        ctrl.data = res;
      }).fail(function (err) {
        console.log(err);
      });


    // //加载数据
    // ctrl.load = function () {
    //   $.ajax({
    //     url:"../../components/menu/data.json",
    //     dataType:'json'
    //   }).done(function (res) {
    //     ctrl.data = res;
    //   }).fail(function (err) {
    //     console.log(err);
    //   });
    // }
  });