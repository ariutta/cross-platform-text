var crossPlatformText = {
  getInstance: function(args){
    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName;
    var format, targetImage;

    var htmlContainerElements = [
      'div',
      'section',
      'p'
    ];

    if (!!targetTagName && htmlContainerElements.indexOf(targetTagName.toLowerCase()) > -1) {
      format = args.format;
      targetImage = this[format].createTargetImage(crossPlatformTextInstance, target);
    } else {
      format = targetTagName;
      targetImage = target;
    }

    var viewport = this[format].getOrCreateViewport(this, targetImage);
    var crossPlatformTextInstance = Object.create(this);
    crossPlatformTextInstance.targetImage = targetImage;
    Object.keys(this[format]).forEach(function(key) {
      if (!crossPlatformTextInstance[key]) {
        if (typeof crossPlatformTextInstance[key] === 'object') {
          crossPlatformTextInstance[key] = Object.create(crossPlatformTextInstance[format][key]);
        } else {
          crossPlatformTextInstance[key] = crossPlatformTextInstance[format][key];
        }
      }
    });
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



