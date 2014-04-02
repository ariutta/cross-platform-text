crossPlatformText.svg.path = {
  generateMarkerId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },

  prepareForRendering: function(shapeName, data) {
    var svgPathGenerator = this;
    var availableMarkers = this.availableMarkers;
    var crossPlatformTextInstance = this.crossPlatformTextInstance;
    var attributeDependencyOrder = [
      'color',
      'markerStart',
      'markerEnd'
    ];
    var canvasPathCommandToSvgPathCommandMappings = {
      moveTo: 'M',
      lineTo: 'L',
      closePath: 'Z',
      bezierCurveTo: 'C',
      quadraticCurveTo: 'Q'
    };

    var result = {};
    var attributes = [];
    result.elementName = 'path';

    // TODO rewrite the path calculation code to not use the d3 path generators
    var shapesUsingD3PathGenerators = [
      'lineCurved',
      'lineElbow',
      'lineSegmented'
    ];
    var d = '';
    if (shapesUsingD3PathGenerators.indexOf(shapeName) === -1) {
      var pathSegments = crossPlatformText.pathCalculator[shapeName](data);
      // the path segments are defined using the Canvas path command terms. The path commands used are only those
      // that are common to both Canvas and SVG
      pathSegments.forEach(function(pathSegment) {
        d += canvasPathCommandToSvgPathCommandMappings[pathSegment.command];
        d += pathSegment.points.join(',');
      });
    }
    else {
      d = crossPlatformText.pathCalculator[ shapeName ](data);
    }
    attributes.push({name: 'd', value: d});


    var backgroundColor = data.backgroundColor || 'transparent';
    attributes.push({name: 'fill', value: backgroundColor});

    var color;

    //*
    var svgPathAttributeGenerator = {
      id: function(idValue){
        attributes.push({name: 'id', value: idValue});
      },
      strokeDasharray: function(strokeDasharrayValue){
        attributes.push({name: 'stroke-dasharray', value: strokeDasharrayValue});
      },
      fill: function(fillValue){
        attributes.push({name: 'fill', value: fillValue});
      },
      fillOpacity: function(fillOpacityValue){
        attributes.push({name: 'fill-opacity', value: fillOpacityValue});
      },
      color: function(colorValue){
        color = colorValue;
        attributes.push({name: 'color', value: colorValue});
        attributes.push({name: 'stroke', value: colorValue});
      },
      markerStart: function(markerStartValue) {
        crossPlatformTextInstance.svg.marker.append(markerStartValue, 'start', color, function(markerId) {
          attributes.push({name: 'marker-start', value: 'url(#' + markerId + ')'});
        });
      },
      markerEnd: function(markerEndValue) {
        crossPlatformTextInstance.svg.marker.append(markerEndValue, 'end', color, function(markerId) {
          attributes.push({name: 'marker-end', value: 'url(#' + markerId + ')'});
        });
      },
      rotation: function(rotationValue) {
        var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        attributes.push({name: 'transform', value: transform});
      },
      strokeWidth: function(strokeWidthValue) {
        attributes.push({name: 'stroke-width', value: strokeWidthValue});
      }
    };

    // These are generic attributes that can apply to any pathShape.
    var attributeListItemName, attributeListItemValue;
    var attributeList = d3.map(data).entries().sort(function(a, b) {
      return attributeDependencyOrder.indexOf(a.key) - attributeDependencyOrder.indexOf(b.key);
    });
    attributeList.forEach(function(attributeListItem){
      attributeListItemName = attributeListItem.key;
      attributeListItemValue = attributeListItem.value;
      if (svgPathAttributeGenerator.hasOwnProperty(attributeListItemName)) {
        svgPathAttributeGenerator[attributeListItemName](attributeListItemValue);
      }
    });
//*/

    result.attributes = attributes;
    self.myResult = result;
    return result;
  }

};

/*
<marker id="src-shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">

        <!-- t-bar markers: vertical line; and extended drawing-board rect -->
	
	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>
	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>

</g></marker>
//*/

/*
  var myEdgeRenderingData = crossPlatformTextInstance1.lineCurved({
    id:'my-edge',
    points:[{x:100,y:75},{x:1,y:190},{x:60,y:310},{x:100,y:325}],
    color:'green',
    markerEnd:'tBar'});
  var myEdge = d3.select('svg').select('#viewport').append(myEdgeRenderingData.elementName)
  myEdgeRenderingData.attributes.forEach(function(attribute) {
    myEdge.attr(attribute.name, attribute.value);
  });

  var myNodeRenderingData = crossPlatformTextInstance1.complex({
    id:'my-node',
    x:100,
    y:300,
    width:80,
    height:50,
    color:'brown',
    backgroundColor:'white'});
  var myNode = d3.select('svg').select('#viewport').append(myNodeRenderingData.elementName)
  myNodeRenderingData.attributes.forEach(function(attribute) {
    myNode.attr(attribute.name, attribute.value);
  });
d3.select('#my-edge').attr('fill', 'url(#gradient-for-my-edge)')
d3.select('#edge2').attr('fill', 'url(#gradient-for-edge2)')
//*/
