var crossPlatformText = {
  getInstance: function(args){
    var crossPlatformTextInstance = _.cloneDeep(this);

    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName;
    var targetSelection = d3.select(target);
    var format, targetImageSelection;

    var htmlContainerElements = [
      'div',
      'section',
      'p'
    ];

    if (!!targetTagName && htmlContainerElements.indexOf(targetTagName.toLowerCase()) > -1) {
      format = args.format;
      crossPlatformTextInstance.targetImageSelection = crossPlatformTextInstance[format].getTargetImageSelection(crossPlatformTextInstance, targetSelection[0][0]);
    } else {
      format = targetTagName;
      crossPlatformTextInstance.targetImageSelection = targetSelection;
    }

    crossPlatformTextInstance[format].getOrCreateViewport(crossPlatformTextInstance, crossPlatformTextInstance.targetImageSelection[0][0]);
    crossPlatformTextInstance.render = crossPlatformTextInstance[format].render;
    return crossPlatformTextInstance;
  },
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  convertToPx: function(inputString, fontSize) {
    // if current fontSize is 12pt, then 1em = 12pt = 16px = 100%
    var inputStringLowerCased, px;
    if (this.isNumber(inputString)) {
      px = inputString;
    }
    else {
      inputStringLowerCased = inputString.toLowerCase();
      if (inputStringLowerCased.indexOf('em') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * fontSize;
      }
      else if (inputStringLowerCased.indexOf('px') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2);
      }
      else if (inputStringLowerCased.indexOf('pt') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * (4/3);
      }
      else if (inputStringLowerCased.indexOf('%') > -1) {
        px = (inputStringLowerCased.slice(0,inputStringLowerCased.length-1) / 100) * fontSize;
      }
      else {
        px = inputString;
      }
    }
    return px;
  }
};



