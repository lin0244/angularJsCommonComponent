angular.module('myApp',['inputSelector'])
  .controller('MainCtrl',function($scope){
    var ctrl = this;

    //inputSelector
    ctrl.dataList = [];
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
  });
