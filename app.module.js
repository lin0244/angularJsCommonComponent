angular.module('myApp',['inputSelector'])
  .controller('MainCtrl',function($scope){
    var ctrl = this;
    ctrl.dataList = [];
    ctrl.dataListA = [];
    ctrl.label = "情景名称";
    //获取服务端数据
    ctrl.load = function () {
      ctrl.dataList = ["测试1","测试2","测试3","测试4","情景1","情景2","情景3"];
    };
    //保存配置信息
    ctrl.save = function (msg) {
      ctrl.dataList.push(msg);
      console.log(ctrl.dataList.join(","));
    };
    //更换情景
    ctrl.changed = function (msg) {
      console.log('you have changed ' + msg);
    };
    //
    ctrl.delete = function (msg) {
      var index = ctrl.dataList.indexOf(msg);

      index!==-1&&ctrl.dataList.splice(index,1);
      console.log('you have deleted ' + msg);
    };


    ctrl.loadA = function () {
      ctrl.dataListA = [];
    };
    //保存配置信息
    ctrl.saveA = function (msg) {
      ctrl.dataListA.push(msg);
      console.log(ctrl.dataList.join(","));
    };
    //更换情景
    ctrl.changedA = function (msg) {
      console.log('you have changed ' + msg);
    };
    //
    ctrl.deleteA = function (msg) {
      var index = ctrl.dataListA.indexOf(msg);

      index!==-1&&ctrl.dataListA.splice(index,1);
      console.log('you have deleted ' + msg);
    };

  });
