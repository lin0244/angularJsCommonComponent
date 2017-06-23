(function () {
  // 模拟工作流

  // 定义请假单的业务数据模型
  function LeaveRequestModel() {
    // 请假人
    this.user = '';
    // 请假开始时间
    this.beginDate = '';
    // 请假天数
    this.leaveDays = '';
    // 审核结果
    this.result = '';
  }

  /*
   请假流程，需项目经理和部门经理审批
   */

  function LeaveRequestContext2() {
    this.state = null;
    // 包含流程处理需要的业务数据对象
    this.businessVO = null;
    this.doWork = function () {
      debugger;
      if (typeof this.state == 'function') {
        this.state = this.state(this);
        this.doWork();
      }
    };
  }

  function projectManagerState(request) {
    var leaveRequestModel = request.businessVO;

    console.log('项目经理审核中，请稍候。。');
    console.log(leaveRequestModel.user + '申请从'
      + leaveRequestModel.beginDate + '开始请假'
      + leaveRequestModel.leaveDays + '天，请项目经理审核（1为同意，2为不同意）');

    var answer = window.prompt('1为同意，2为不同意');
    var result = answer == 1 ? '同意' : '不同意';
    leaveRequestModel.result = '项目经理审核结果：' + result;

    var state;
    if (answer == 1) {
      if (leaveRequestModel.leaveDays > 3) {
        state = depManagerState;
      } else {
        state = auditOverState;
      }
    } else {
      state = auditOverState;
    }

    return state;
  }

  function depManagerState(request) {
    var leaveRequestModel = request.businessVO;

    console.log('部门经理审核中，请稍候。。');
    console.log(leaveRequestModel.user + '申请从'
      + leaveRequestModel.beginDate + '开始请假'
      + leaveRequestModel.leaveDays + '天，请项目经理审核（1为同意，2为不同意）');

    var answer = window.prompt('1为同意，2为不同意');
    var result = answer == 1 ? '同意' : '不同意';
    leaveRequestModel.result = '部门经理审核结果：' + result;

    return auditOverState;
  }

  function auditOverState(request) {
    var leaveRequestModel = request.businessVO;
    // do sth
    console.log(leaveRequestModel.user + '，你的请假申请已经审核结束，结果是：' + leaveRequestModel.result);
  }

  var lrm = new LeaveRequestModel();
  lrm.user = '小林';
  lrm.beginDate = '2014-4-2';
  lrm.leaveDays = 5;

  var request = new LeaveRequestContext2();
  request.businessVO = lrm;
  request.state = projectManagerState;

  request.doWork();

}());