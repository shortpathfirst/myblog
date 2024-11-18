# GeoJSON

Formats:
- Geojson
Tiling libraries like Leaflet can use GeoJSON to create map layers .
- The shapefile format is a geospatial vector data format for geographic information system **(GIS)** softwares like `mapshaper`, `ogr2ogr`, `shp2json` or `QGIS`.
    The **shapefile** is a common standard for representing geospatial vector data. There are several ways of working with Openstreetmap data and shapefiles.

https://www.geoapify.com/geojson-javascript-developer-guide/

> Official specification https://geojson.org/
- **Topojson** Pay attention to `bbox` or `bounding box` and `arcs` object, also there are no geometry objects. That’s how TopoJSON overcomes the exhausting payload size of GeoJSON, by encoding GeoJSON `feature` collection into `arcs`

Shapefiles are often exported as GeoJSON


## Format
>At its core, GeoJSON revolves around the concept of features, which are individual geographic entities. A Feature represents a single geographic entity and combines properties (any additional information or attributes) with geometries

Each `feature` consists of `geometry` (simple polygons in the case of the countries and a point for Timbuktu) and `properties`.

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": 
            // HERE GOES THE POLYGON OBJECTS
            {
                "type": "LineString",
                "coordinates": [
                    [ -73.9939, 40.7114 ],
                    [ -73.9932, 40.7043 ]
                ]
            }
            //////////////
        }
    ]
}
```
```js
{ 
  type:"Feature",
  properties: {...},
  geometry: {
    type: "MultiPolygon",
    coordinate: /* coordinates here */
  }
}
```
The individual polygons are structured as so:
```
 [outer ring][inner ring][inner ring]
 ```
### Rewind json
https://observablehq.com/@bumbeishvili/rewind-geojson
https://stackoverflow.com/questions/54947126/geojson-map-with-d3-only-rendering-a-single-path-in-a-feature-collection

# Plot Geojson
1. **Using geojson.io**
2. **Using python library**
```py
import geopandas as gpd
import matplotlib.pyplot as plt
from geopandas import GeoSeries, GeoDataFrame
# Load large GeoJSON file
gdf = gpd.read_file('C:\\Users\\Andrea\\Desktop\\abc\\geo.geojson')

# Plot the GeoJSON data using Matplotlib
gdf.plot()
plt.show()
```
3. **Using leaflet**
```js
//<!-- Load Leaflet -->
//<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

var map = L.map('map').setView([-1.30, -48.41], 11); // Center the map

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'

}).addTo(map);

// Load GeoJSON data
fetch('center.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: (feature) => {
                return {
                    //ADD STYLING
                };
            }
        }
        ).addTo(map);
    });
```
# Fetching Geojson
[How to fetch using openstreetmap](https://peteris.rocks/blog/openstreetmap-administrative-boundaries-in-geojson/#:~:text=Go%20to%20polygons.openstreetmap.fr%20and%20enter%20the%20ID%20of,GeoJSON%20link.%20Or%20just%20go%20directly%20to%20http%3A%2F%2Fpolygons.openstreetmap.fr%2Fget_geojson.py%3Fid%3DRELATONID%26params%3D0)

##  1.  find relation ID using Openstreetmap
    https://nominatim.openstreetmap.org/ui/search.html?q=Nazar%C3%A9%2C+bel%C3%A9m

## 2. Getting polygon boundaries of cities
    https://polygons.openstreetmap.fr/index.py

**In alternative by query**
You can get polygon coordenates in json for using with googlemaps using openstreetmap

To get polygon boundaries just add `format=json` to your request!
```js
//Example Search
https://nominatim.openstreetmap.org/ui/search.html?q=Nazar%C3%A9%2C+bel%C3%A9m
//Example json request
https://nominatim.openstreetmap.org/search.php?q=Warsaw+Poland&polygon_geojson=1&format=json

https://nominatim.openstreetmap.org/search.php?q=B%C3%A8lem+Brazil&polygon_geojson=1&format=json
```
## 3. Creating a script
```py
# FETCH BY RELATION_ID
import request
site = "https://polygons.openstreetmap.fr/get_geojson.py?id="

 for region in listRegions:
     for neighboor in region.items():
         #(key,value) -> (neighboor[0],neighboor[1])
         response = requests.get(site+str(neighboor[1]))
         # WRITE TO FILE
         # data = response.json()
         # json.dump(data)
         
# WRAP JSON
feature = {
    "type": "Feature",
    "properties": {
        "name":name,
        "relation_id":listRegionsDict[current][name],
        "distr_name": current,
        "distr_id":listRegionsID[current],
        # "area":area(content) # UNCOMMENT AREA
    },
    "geometry": content
}

```