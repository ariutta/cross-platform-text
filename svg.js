crossPlatformText.svg = {

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
  init: function(data, callback) {
    var viewport;
    if (!this.targetImageSelection) {
      var id = args.id || 'cross-platform-text-svg';
      targetImageSelection = this.targetSelection.append('svg')
      .attr('id', id)
      .attr('version', '1.1')
      .attr('baseProfile', 'full')
      .attr('xmlns', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width)
      .attr('height', height);

      viewport = targetImageSelection.append('g')
      .attr('id', 'viewport');
    }
    else {
      targetImageSelection = this.targetImageSelection;
      viewport = targetImageSelection.select('#viewport');
      if (!viewport[0][0]) {
        viewport = targetImageSelection.select('g');
      }
    }

    if (!!callback) {
      callback(viewport);
    }
  },
  render: function(data, callback) {
    var svgTextDataGenerator = this;
    var crossPlatformTextInstance = this.crossPlatformTextInstance;
    var attributeDependencyOrder = [
      'fontSize'
    ];
    var canvasPathCommandToSvgPathCommandMappings = {
      moveTo: 'M',
      lineTo: 'L',
      closePath: 'Z',
      bezierCurveTo: 'C',
      quadraticCurveTo: 'Q'
    };

    var translateX = data.x + data.width / 2;
    var translateY = data.y + data.height / 2;
    var transform = 'translate(' + translateX + ' ' + translateY + ')';
    var textAreaSelection = targetImageSelection.select(data.containerSelector).append('g')
    .attr('transform', transform);

    var textAnchor, textLinesX;
    if (data.textAlign === 'left'){
      textAnchor = 'start';
      textLinesX = -1 * data.width / 2;
    }
    else if (data.textAlign === 'right') {
      textAnchor = 'end';
      textLinesX = data.width / 2;
    }
    else {
      textAnchor = 'middle';
      textLinesX = 0;
    }
    var textContentSplitIntoLines = data.textContent.split(/\r\n|\r|\n|&#xA;/g);
    var textLineCount = textContentSplitIntoLines.length;

    var textLinesSelection = textAreaSelection.selectAll('text')
    .data(textContentSplitIntoLines)
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", textLinesX)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    .attr("alignment-baseline", data.verticalAlign) 
    .attr("text-anchor", textAnchor)
    .text(function (d) { return d; });

    var result = {};
    var attributes = [];
    result.elementName = 'g';

    var backgroundColor = data.backgroundColor || 'transparent';
    attributes.push({name: 'fill', value: backgroundColor});

    var color;

    //*
    var svgTextAttributeGenerator = {
      id: function(idValue){
        textAreaSelection.attr('id', 'text-for-' + idValue);
        //attributes.push({name: 'id', value: 'text-for-' + idValue});
      },
      fontSize: function(fontSizeValue){
        textAreaSelection.attr('font-size', fontSizeValue);
        //attributes.push({name: 'font-size', value: fontSizeValue});
      },
      fill: function(fillValue){
        textAreaSelection.attr('fill', fillValue);
        attributes.push({name: 'fill', value: fillValue});
      },
      fillOpacity: function(fillOpacityValue){
        textAreaSelection.attr('id', 'text-for-' + idValue);
        //attributes.push({name: 'fill-opacity', value: fillOpacityValue});
      },
      color: function(colorValue){
        color = colorValue;
        textAreaSelection.attr('fill', colorValue);
        //attributes.push({name: 'color', value: colorValue});
        //attributes.push({name: 'stroke', value: colorValue});
      },
      rotation: function(rotationValue) {
        transform += ' rotate(' + rotationValue + ')';
        //transform += ' rotate(' + rotationValue + ',' + (-1 * data.width/2) + ',' + (-1 * data.height/2) + ')';
        //transform += ' rotate(' + rotationValue + ',' + (data.x) + ',' + (data.y) + ')';
        //transform += ' rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        textAreaSelection.attr('transform', transform);
        //attributes.push({name: 'transform', value: transform});
      }
    };

    var attributeListItemName, attributeListItemValue;
    var attributeList = d3.map(data).entries().sort(function(a, b) {
      return attributeDependencyOrder.indexOf(a.key) - attributeDependencyOrder.indexOf(b.key);
    });
    attributeList.forEach(function(attributeListItem){
      attributeListItemName = attributeListItem.key;
      attributeListItemValue = attributeListItem.value;
      if (svgTextAttributeGenerator.hasOwnProperty(attributeListItemName)) {
        svgTextAttributeGenerator[attributeListItemName](attributeListItemValue);
      }
    });

    //result.attributes = attributes;
    if (!!callback) {
      callback(textAreaSelection);
    }
  }












/*
  render: function(args, callback) {
    var crossPlatformTextInstance = this.crossPlatformTextInstance;
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

    //nodeText.attr('transform', function(d) {
    //  applyTextAlign(nodeText[0][0], d, function(translate) {
   //     return 'translate(' + translate.dx + ' ' + translate.dy + ')';
    //  });
    //})

  }
  //*/
};

