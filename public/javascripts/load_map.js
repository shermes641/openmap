/* Java script module to map a energy system
 *
 * requires jquery and openlayers
 */

"use strict";
var map;

/* Function to make the ajax request and call the callback function on
 * success */
var get_system = function(id, callback) {
  $.ajax({
    url: '/systemmap/' + id
  }).done(function(data) {
    callback(data);
  }).error(function(error) {
    alert('error ' + error.responseText);
  });
};

var load_energy_systems = function(map, system_id) {
  var energy_systems,
      system_style,
      system_feature;
  // The default style for OpenLayer features is not nice, override it
  // here.
  system_style = new OpenLayers.StyleMap({
    'default': {
      strokeColor: "#000",
      strokeWidth: 1,
      fillColor: '#ff00ff',
      pointRadius: 6
    }
  }); 

  /* The features need a "container" layer in order to render on the
   * map. This is where we can add features
   */
  energy_systems = new OpenLayers.Layer.Vector('energy systems', {
    projection: map.getProjectionObject(),
    styleMap: system_style}
  );
  map.addLayer(energy_systems);

  /* loads a energy system from the url end point and adds it to the map */
  get_system(system_id, function(data) {
    var native_location,
        google_location;

    native_location = new OpenLayers.Geometry.Point(
      data.longitude,
      data.latitude
    );
    // transform the geographic coordinates to Google's projection
    google_location = native_location.transform(
      new OpenLayers.Projection("EPSG:4326"),
      map.getProjectionObject()
    );
   
    system_feature = new OpenLayers.Feature.Vector(
      google_location,
      {location: data.location}
    );

    energy_systems.addFeatures([system_feature]);

    // zoom to the bounds of the feature Not sure the map setCenter
    // method requires the point to be cast to a lon lat 
    // TODO see if this necessary
    map.setCenter(new OpenLayers.LonLat(
      google_location.x, google_location.y), 7);

  });

};

var load_map = function(options) {

  var google_stat;

  map = new OpenLayers.Map({
    div: options.div,
    displayProjection: new OpenLayers.Projection('EPSG:4326'),
    projection: new OpenLayers.Projection('EPSG:90091'),

    units: "m",
    numZoomLevels: 18,
    maxResolution: 156543.0339,
    maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508)

  });

  google_stat = new OpenLayers.Layer.Google(
    'Google Base Layer', 
    {type: google.maps.MapTypeId.SATELLITE,
     sphericalMercator: true,
     numZoomLevels: 22,
     visibility: false}
  );
  // add the google satellite layer as a base layer.
  map.addLayer(google_stat);

  load_energy_systems(map, options.id);
  
};
