function HeroListController($scope, $element, $attrs) {
  var ctrl = this;

  ctrl.list = [
    {
      name    : "Superman",
      location: ""
    },
    {
      name    : "Batman",
      location: "Wayne Manor"
    }
  ];

  ctrl.updateHero = function (hero, prop, value) {
    hero[prop] = value;
  };

  ctrl.deleteHero = function (hero) {
    var idx = ctrl.list.indexOf(hero);
    idx>=0 && ctrl.list.splice(idx,1);
  };
}

angular.module('heroApp')
  .component('heroList',{
    templateUrl:'heroList.html',
    controller:HeroListController,
    bindings: {
      hero     : '<',
      onDelete : '&',
      onUpdate : '&'
    }
  });