crossPlatformText.svg.marker = {
  generateId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },
  append: function(name, position, color, callback) {
    var availableMarkers = this.availableMarkers;
    var targetImageSelectionDefs = this.targetImageSelectionDefs;
    var backgroundColor = this.backgroundColor;

    var markerData = {
      arrow: {
        markerElement: {
          viewBox:'0 0 12 12',
          markerWidth:12,
          markerHeight:12,
          refY:6
        },
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'polygon',
            points:'12,11 0,6 12,1',
            'stroke-width':0,
            fill:color
          }
        ]
      },
      tBar: {
        markerElement: {
          viewBox:'0 0 10 20',
          markerWidth:10,
          markerHeight:20,
          refY:10
        },
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:9,
            width:8,
            height:2,
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            x:0,
            y:0,
            width:12,
            height:12,
            stroke:color,
            'stroke-width':1.8,
            x1:7,
            y1:0,
            x2:7,
            y2:20
          }
        ]
      }
    };

    markerData.mimInhibition = markerData.tBar;

    var markerId = this.generateId(name, position, color);
    if (availableMarkers[markerId]) {
      callback(markerId);
    }
    else {
      var marker = targetImageSelectionDefs.append('marker')
      .attr('id', markerId)
      .attr('orient', 'auto')
      .attr('markerUnits', 'strokeWidth')
      .attr('preserveAspectRatio', 'none');
      d3.map(markerData[name].markerElement).entries().forEach(function(attribute) {
        marker.attr(attribute.key, attribute.value);
      });
      if (position === 'end') {
        marker.attr('refX', markerData[name].markerElement.markerWidth);
      }
      else {
        marker.attr('refX', 0);
      }

      var markerContainer = marker.append('g')
      .attr('id', 'g-' + markerId);

      if (position === 'end') {
        markerContainer.attr('transform', 'rotate(180, ' + markerData[name].markerElement.markerWidth/2 + ', ' + markerData[name].markerElement.markerHeight/2 + ')');
      }

      markerData[name].shapes.forEach(function(shape) {
        var shapeSelection = markerContainer.append(shape.elementTag);
        d3.map(shape).entries().forEach(function(attribute) {
          if (attribute.key !== 'elementTag') {
            shapeSelection.attr(attribute.key, attribute.value);
          }
        });
      });

      availableMarkers[markerId] = true;
      callback(markerId);
    }
  }
};
