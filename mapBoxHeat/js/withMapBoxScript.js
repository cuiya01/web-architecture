
    const API_TOKEN_Mapbox = 'pk.eyJ1IjoidWNmbm16MCIsImEiOiJja3ZhdG56Z2IwMmE2Mm9uNm9nbnZvZG5wIn0.YD41mSWi6vImdUjKc47PVA';
    mapboxgl.accessToken = API_TOKEN_Mapbox;

    const API_KEY_HERE = "85M6KrKVnx45I2-wfD5KWuMB8egtwIW_IKDZd4XNv_s";


    const INITIAL_VIEW_STATE = {
        longitude: -0.12,
        latitude: 51.5,
        zoom: 12,
        bearing: 0,
        pitch: 0
    };


      // MapBox Vector Tile
      const map = new mapboxgl.Map({
        container: 'map',
        //  style: 'mapbox://styles/mapbox/light-v10', //vector tiles require a Mapbox API to access them
        style: 'mapbox://styles/mapbox/navigation-night-v1',

        // Note: deck.gl will be in charge of interaction and event handling
        interactive: true,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch
    });



    map.on('load', () => {



        map.addSource('myData', {
          type: 'geojson',
          data: 'resources/myData.geojson'
        });

        const geojson = {"type": "FeatureCollection",
        "features": [
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.124603,51.500896]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Bigben",
                    "heat":1.775
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.09929038196690297,51.508676367797285]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Tate Morden",
                    "heat":0.894
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.11954297294079794,51.50343084692139]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "London Eye",
                    "heat":7.708
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.12827467479226445,51.50906276178127]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "National Gallery",
                    "heat":8.479
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.12701024595593177,51.5196135595575]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "British museum",
                    "heat":8.613
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.07584961469949537,51.50947490124]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Tower of London",
                    "heat":1.314
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.17216927294105142,51.49675940777218]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Victoria and Albert Museum",
                    "heat":7.717
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.07536723061262272,51.50558326255463 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "London Tower Bridge",
                    "heat":9.453
                }
            },


            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.127267116069872 ,51.499805270230155 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Westminster Abbey",
                    "heat":7.444
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.16569155196675464 , 51.50773254598538 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Hyde Park",
                    "heat":8.997
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.08643840389352578 , 51.50467878549576 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "The Shard",
                    "heat":10.594
                }
            },

            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.12808646579321398 ,  51.50812677208848 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Trafalgar Square",
                    "heat":6.081
                }
            }



        ]
    }

    // add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
  new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);

}

        // Add a symbol layer
map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'myData',
    'layout': {

    // get the title name from the source's "title" property
    'text-field': ['get', 'description'],
    'text-font': [
    'Open Sans Semibold',
    'Arial Unicode MS Bold'
    ],

    'text-offset': [0, 1.25],
    'text-anchor': 'top'
    },

    paint: {
        "text-color": "#ffffff"
      }
    });


        map.addLayer(
          {
            id: 'spot-heat',
            type: 'circle',
            source: 'myData',
            minzoom: 11,
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increases
              'circle-radius': {
                property: 'heat',
                type: 'exponential',
                stops: [
                  [{ zoom: 11, value: 1 }, 10],
                  [{ zoom: 11, value: 12 }, 40],
                  [{ zoom: 22, value: 1 }, 40],
                  [{ zoom: 22, value: 12 }, 200]
                ]
              },

              'circle-color': {
                property: 'heat',
                type: 'exponential',
                stops: [
                  [0, 'rgba(255,191,0,10)'],

                  [8, 'rgba(255,191,0,50)'],

                  [12,'rgba(255,191,0,100)'],
                  [70, 'red']
                ]


              },
              'circle-stroke-color': 'white',
              'circle-stroke-width': 2,
              'circle-opacity': {
                stops: [
                  [11, 0],
                  [13, 1]
                ]
              }

            }
          },
          'waterway-label'
        );





  const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            // 'fill-extrusion-height':["get", "height"],
            // 'fill-extrusion-base': ["get", "min_height"],

            'fill-extrusion-height':[
          "interpolate", ["linear"], ["zoom"],
          // zoom is 15 (or less) -> buildings height is 0
            15, 0,
          // zoom is 15.05 (or greater) -> buildings height is actual value
            15.05, ["get", "height"]
        ],
          'fill-extrusion-base':[
          "interpolate", ["linear"], ["zoom"],
          // zoom is 15 (or less) -> buildings height is 0
            15, 0,
          // zoom is 15.05 (or greater) -> buildings height is actual value
            15.05, ["get", "min_height"]
        ],
            'fill-extrusion-opacity': 0.8
        }
      },
      firstLabelLayerId
      );
    });


    map.on('click', 'spot-heat', (event) => {
      new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(`<strong>Place:</strong> ${event.features[0].properties.description}`)
        // .setHTML(`<strong>DBH:</strong> ${event.features[0].properties.dbh}`)
        .addTo(map);
    });



    function hideTooltip() {
      d3.select("#tooltip").style("visibility", "hidden");
    }

    function showTooltip(info, object) {
      d3
        .select("#tooltip")
        .style("top", info.center.y + 3)
        .style("left", info.center.x)
        .style("visibility", "visible")
        .style("pointer-events", "none")
        .html(`<img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Cyclist_Icon_Germany_A1.svg" class='icon'/>
                 <p class='title'> ${object.commonName}</p>
                 <p class='item-a'> Free Bikes: ${object.additionalProperties[6].value}</p>
                 <p class='item-b'> Empty Docks: ${object.additionalProperties[7].value}</p>`);
    }
