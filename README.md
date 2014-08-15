cross-platform-text
===================

JS library for creating text in SVG, Canvas and possibly other formats in the future. Handles both single- and multi-line text.

Usage
=====

1) Create Instance
  ```js
  var myInstance1 = crossPlatformText.getInstance({
    targetSelector:'#my-svg1', // (CSS selector) required
    format: 'svg' // ('svg' or 'canvas') required if 'targetSelector' does not reference an SVG or Canvas element
  });
  ```

  ```targetSelector``` references an SVG, Canvas or HTML element (such as a div).
  If it references an HTML element, the library will create a new SVG or Canvas element inside
  the HTML element, as specified by ```format```.

  For an existing SVG, the library will look for a ```g``` element with the class ```viewport```.
  If it does not exist, the library will create it.

2) Render text

  ```js
  var myText1 = myInstance1.render({
      x:50, // (px) required
      y:200, // (px) required
      width:100, // (px) required
      height:20, // (px) required
      textContent:'My text 1', // (string) required
      color:'blue', // (CSS name or hex value) default: black. optional
      containerSelector:'g.viewport', // (CSS selector) default: 'g.viewport'. optional
      id:'my-text1', // (string) optional
      fill:'#ff00ff', // (CSS name or hex value) optional
      fillOpacity:0.5, // (value between 0 and 1) optional
      fontSize:12, // (CSS value) default: 12. optional
      fontFamily:'Tahoma', // (CSS value) optional
      fontStyle:'italic', // (CSS value) optional
      fontWeight:'bold', // (CSS value) optional
      rotation:30, // (degrees) optional
      textAlign:'center', // (CSS value) default: center horizontally aligned. optional
      verticalAlign:'middle', // (CSS value) default: middle vertically aligned. optional
    });
  ```
