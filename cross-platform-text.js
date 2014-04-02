window.crossPlatformText = {
  init: function(args, callback){
    var crossPlatformTextInstance = this;
    this.svg.crossPlatformTextInstance = crossPlatformTextInstance;

    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName.toLowerCase();
    var targetSelection = d3.select(target);
    var format, targetImageSelection;

    var htmlContainerElements = [
      'div',
      'section',
      'p'
    ];

    if (htmlContainerElements.indexOf(this.targetTagName) > -1) {
      format = args.format;
      this[format].targetSelection = targetSelection;
      this.setFormat(format, targetTagName, targetSelection);
      crossPlatformTextInstance[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
    else {
      format = targetTagName;
      this[format].targetImageSelection = targetSelection;
      this.setFormat(format, targetTagName, targetSelection);
      this[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
  },
  setFormat: function(format, targetTagName, targetSelection) {
    var crossPlatformTextInstance = this;
    this[format].targetTagName = targetTagName;
    this.render = this[format].render;
  }
};



