window.crossPlatformText = {
  init: function(args, callback){
    var customShapes = args.customShapes;
    var crossPlatformTextInstance = this;
    this.svg.crossPlatformTextInstance = this.svg.path.crossPlatformTextInstance = crossPlatformTextInstance;

    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName.toLowerCase();
    var targetSelection = d3.select(target);
    var format, targetImageSelection;


    if (targetTagName === 'div') {
      format = args.format;
      this[format].targetSelection = targetSelection;
      this.setFormat(format, customShapes, targetTagName, targetSelection);
      crossPlatformTextInstance[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
    else {
      format = targetTagName;
      this[format].targetImageSelection = targetSelection;
      this.setFormat(format, customShapes, targetTagName, targetSelection);
      this[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
  },
  setFormat: function(format, customShapes, targetTagName, targetSelection) {
    var crossPlatformTextInstance = this;
    this[format].targetTagName = targetTagName;
    var presetShapesNames = [
      'arc',
      'arrow',
      'brace',
      'complex',
      'endoplasmicReticulum',
      'golgiApparatus',
      'hexagon',
      'lineCurved',
      'lineElbow',
      'lineSegmented',
      'lineStraight',
      'mimDegradation',
      'mitochondria',
      'ovalDouble',
      'oval',
      'pentagon',
      'rectangle',
      'roundedRectangleDouble',
      'roundedRectangle',
      'sarcoplasmicReticulum',
      'triangle',
      'mimNecessaryStimulation',
      'mimBinding',
      'mimConversion',
      'mimStimulation',
      'mimModification',
      'mimCatalysis',
      'mimInhibition',
      'mimCleavage',
      'mimCovalentBond',
      'mimTranscriptionTranslation',
      'mimGap',
      'tBar',
      'mimBranchingLeft',
      'mimBranchingRight'
    ];
    presetShapesNames.forEach(function(presetShapeName) {
      crossPlatformTextInstance[presetShapeName] = function(data){
        return crossPlatformTextInstance[format].path.prepareForRendering(presetShapeName, data);
      };
    });

    if (!!customShapes) {
      crossPlatformTextInstance.customShapes = customShapes;
      crossPlatformTextInstance[format].image.customShapes = customShapes;
      d3.map(customShapes).keys().forEach(function(customShapeName) {
        crossPlatformTextInstance[customShapeName] = function(data){
          return crossPlatformTextInstance[format].image.prepareForRendering(customShapeName, data);
        };
      });
    }
  }
};


window.crossPlatformText = {

  // for more details, see 
  // http://www.w3.org/TR/SVG11/text.html#TextAnchorProperty
  // start | middle | end | inherit
  // and
  // http://www.w3.org/TR/CSS2/text.html#alignment-prop
  // left | right | center | justify | inherit

    /*
    'left': 'start',
    'right': 'end',
    'center': 'middle',
    'inherit': 'inherit',
    'justify': null
    //*/


  render: function(args, callback) {
    // TODO make a better caching system
    var cache = {};
    cache.padding = 5;
    var text = {};
    text.cache = {};
    text.cache.fontSize = 12;
    text.cache.alignmentBaseline = data.text.verticalAlign;
    text.cache.textAnchor = function() {
      if (data.text.textAlign == 'left'){
        return 'start';
      } else if (data.text.textAlign == 'right') {
        return 'end';
      } else {
        return 'middle';
      }
    };
    text.cache.x = function() {
      if (data.text.textAlign == 'left'){
        return -1 * data.width / 2;
      } else if (data.text.textAlign == 'right') {
        return data.width / 2;
      } else {
        return 0;
      }
    };
    text.cache.translate = {};
    // TODO replace this with the actual translate values
    text.cache.translate.dx = data.width / 2;
    text.cache.translate.dy = data.height / 2;
    text.line = {};
    text.line.cache = {};
    text.line.cache.y = [];
    var textLineCount = data.text.line.length;
    var i = 0;
    data.text.line.forEach(function(line) {
      text.line.cache.y.push(i * text.cache.fontSize);
      i += 1;
    });  

    var textArea = nodeContainer.selectAll('g.text-area')
    .data(function(d) {
      return [data];
    })
    .enter()
    .append('g')
    .attr("id", function (d) {
      return 'text-container' + pathvisiojs.view.pathwayDiagram.svg.convertToId(d.id);
    })
    .attr('transform', function(d) {
      return 'translate(' + text.cache.translate.dx + ' ' + text.cache.translate.dy + ')';
    })
    .attr("class", "text-area")
    .attr("style", function (d) {
      var style = '';
      if (d.text.hasOwnProperty('color')) {
        style += 'fill:' + d.text.color + '; ';
      }
      if (d.text.hasOwnProperty('fontFamily')) {
        style += 'font-family:' + d.text.fontFamily + '; ';
      }
      if (d.text.hasOwnProperty('fontSize')) {
        style += 'font-size:' + d.text.fontSize + 'px; ';
      }
      if (d.text.hasOwnProperty('fontWeight')) {
        style += 'font-weight:' + d.text.fontWeight + '; ';
      }
      if (d.text.hasOwnProperty('fontStyle')) {
        style += 'font-style:' + d.text.fontStyle + '; ';
      }
      return style;
    });

    var textLine = textArea.selectAll('text')
    .data(function(d) {
      return d.text.line;
    })
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", text.cache.x)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    .attr("alignment-baseline", text.cache.alignmentBaseline) 
    .attr("text-anchor", text.cache.textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/

    return nodeContainer;
  }
};

