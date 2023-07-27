# 一、html
[W3Schools 在线教程](https://www.w3schools.cn/)
# 二、css
[W3Schools 在线教程](https://www.w3schools.cn/)
# 三、bootstrap
[Bootstrap](https://getbootstrap.com/)
# 四、javascript
[JavaScript 教程](https://www.w3schools.cn/js/default.asp)
# 五、openlayers
## 5.1 入门
OpenLayers是一个用于在Web上显示交互式地图的JavaScript库（**数据经纬度**）。

- 开源免费：OpenLayers是一个完全开源的项目，可以免费使用和修改。
- 跨平台：OpenLayers可以在各种平台上运行，包括桌面浏览器、移动设备和服务器端。
- 显示多种地图服务：OpenLayers支持多种地图服务提供商，如OpenStreetMap、Bing Maps、Google Maps等。
- 丰富的地图控件和工具：OpenLayers提供了丰富的地图控件和工具，如缩放、平移、标注、测量等。
- 矢量数据的显示和编辑：OpenLayers支持矢量数据的显示和编辑，如点、线、面等。
- 支持GIS相关的功能：OpenLayers支持与GIS相关的功能，如投影转换、坐标系转换等。
- 可扩展性：OpenLayers可以通过插件和扩展来增强其功能和性能。
- 社区支持：OpenLayers有一个活跃的社区，提供了丰富的文档、示例和支持。

[OpenLayers v4.6.5 API - Class: Heatmap](https://openlayers.org/en/v4.6.5/apidoc/ol.layer.Heatmap.html)

[OpenLayers - Lastest](https://openlayers.org/)

```javascript
// 定义视图
const view = new ol.View({
    center: ol.proj.fromLonLat([116.39, 39.9]),
    zoom: 5
})

// 定义图层
const osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
})

const layerArray = [osmLayer]

// 定义地图
const map = new ol.Map({
    target: 'map',
    layers: layerArray,
    view: view
})
```
## 5.2 坐标系转换
[地理坐标系与投影坐标系 | Cesium 入门教程](https://syzdev.cn/cesium-docs/advance/coordinate-introduction.html)

[EPSG.io: 坐标标准](https://epsg.io/)

[坐标转换proj](https://github.com/proj4js/proj4js)
```javascript
// 定义坐标系
proj4.defs("EPSG:32643", "+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs");

// 定义视图
const view = new ol.View({
    projection: 'EPSG:32643',
    center: ol.proj.fromLonLat([116.39, 39.9]),
    zoom: 5
})
```

- **openLayers默认使用的是Web墨卡托投影坐标系，也称为EPSG:3857坐标系。**
- **geojson默认使用EPSG:4326坐标系，也称为WGS84坐标系，是一种经纬度坐标系，用于描述地球表面的位置。**
## 5.3 栅格地图

### 5.3.1 stamen地图
Stamen Maps是一组基于OpenStreetMap数据的地图图层，提供了多种风格和颜色的地图，包括水彩风格、黑白风格、地形风格等。在OpenLayers中，可以通过ol.source.Stamen类型的图层数据源对象来加载Stamen Maps地图。

```javascript
const stamenSource = new ol.source.Stamen({
  layer: 'watercolor' // 指定地图图层风格
});

const stamenLayer = new ol.layer.Tile({
  source: stamenSource
});

map.addLayer(stamenLayer);
```
[stamen地图资源](http://maps.stamen.com/)
### 5.3.2 png图片
在OpenLayers中，可以使用ol.source.ImageStatic类型的图层数据源对象来加载静态图片。ol.source.ImageStatic类型的图层数据源对象可以通过url属性指定图片的路径，通过imageExtent属性指定图片在地图上的显示范围。
```javascript
const peopleSource = new ol.source.ImageStatic({
    attributions: '<b>图片</b>',
    url: './assets/image/people.png',
    imageExtent: [13282294.85419822, 4117316.7495201533, 13298270.19310982, 4124482.7209218885],
})

const peopleLayer = new ol.layer.Image({
    source: peopleSource
})

map.addLayer(peopleLayer)
```
### 5.3.3 空间要素
在OpenLayers中，Feature是表示地图上的空间要素（如点、线、面等）的对象。Feature对象包含了空间要素的几何信息和属性信息，可以通过样式来控制其在地图上的显示效果。Feature对象可以被添加到Vector Layer中，从而在地图上显示出来。Feature对象还可以用于进行空间分析、查询和编辑等操作。
```javascript
// 1 定义feature
const feature = new ol.Feature({
    geometry: new ol.geom.Point([13282258.110811716, 4116011.921518731]),
})

const style = new ol.style.Style({
    image: new ol.style.Icon({
        src: './assets/image/tiger.png',
        scale: 0.05
    })
})

feature.setStyle(style)

// 2 定义source
const vectorSource = new ol.source.Vector({
    features: [feature]
})

// 3 定义layer
const vectorLayer = new ol.layer.Vector({
    source: vectorSource
})

// 4 添加layer
map.addLayer(vectorLayer)
```
### 5.3.4 WMS 地图服务
TileWMS和ImageWMS都是OpenLayers中用于显示WMS服务的图层类型，它们的主要区别在于请求方式和显示方式。

- TileWMS使用切片方式请求WMS服务，即将地图分成多个小块，每个小块对应一个WMS请求。这种方式可以提高地图的加载速度和性能，因为只请求当前视图范围内的数据。TileWMS图层通常用于显示栅格数据，如卫星影像、地形图等。
- ImageWMS使用单个请求方式请求WMS服务，即将整个地图作为一个请求发送给WMS服务。这种方式可以保证地图的完整性和一致性，但是会降低地图的加载速度和性能。ImageWMS图层通常用于显示矢量数据，如行政区划、道路、河流等。
- 因此，TileWMS和ImageWMS的主要区别在于请求方式和显示方式。TileWMS使用切片方式请求WMS服务，适用于栅格数据；ImageWMS使用单个请求方式请求WMS服务，适用于矢量数据。

**TileWMS**
```javascript
const tileSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/company/wms',
    params: { 'LAYERS': 'company:Indian_States' },
    serverType: 'geoserver',
})

const tileLayer = new ol.layer.Tile({
    source: tileSource
})

map.addLayer(tileLayer)
```

**ImageWMS**
```javascript
const imageSource = new ol.source.ImageWMS({
    url: 'http://localhost:8080/geoserver/company/wms',
    params: { 'LAYERS': 'company:Indian_States' },
})

const imageLayer = new ol.layer.Image({
    source: imageSource
})

map.addLayer(imageLayer)
```

## 5.4 矢量地图
GeoJSON是一种基于JSON格式的地理空间数据交换格式，它可以用于描述点、线、面等地理空间要素的几何信息和属性信息。GeoJSON格式的数据可以被多种GIS软件和Web地图库（如OpenLayers、Leaflet等）所支持，可以方便地在Web地图上进行展示和分析。
GeoJSON格式的数据由一个JSON对象组成，其中包含了以下三个属性：

- type：表示GeoJSON对象的类型，可以是"Feature"、"FeatureCollection"、"Point"、"LineString"、"Polygon"等。
- geometry：表示地理空间要素的几何信息，可以是点、线、面等。
- properties：表示地理空间要素的属性信息，可以是名称、面积、长度等。

以下是一个GeoJSON格式的数据示例：
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [102.0, 0.5]
  },
  "properties": {
    "name": "My Point"
  }
}
```
在这个示例中，GeoJSON对象的类型为"Feature"，表示这是一个地理空间要素对象。geometry属性表示这个要素的几何信息，它是一个点类型，坐标为[102.0, 0.5]。properties属性表示这个要素的属性信息，包含了一个名称属性"name"，值为"My Point"。
### 5.4.1 文件内部读取

![1.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689727634169-3f951fbb-ac34-44e8-80fb-6a32cf64ced7.png#averageHue=%23d9e2c5&clientId=udf7e6ec8-b481-4&from=ui&id=u2ed6c122&originHeight=517&originWidth=837&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=447962&status=done&style=none&taskId=u8a7ee86d-0c82-4185-a798-976d6307e38&title=)
```json
//文件内部数据读入json数据
const lineJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    [
                        119.32394397498649,
                        34.69532951371582
                    ],
                    [
                        119.35729528683532,
                        34.71800553594258
                    ],
                    [
                        119.40995525290981,
                        34.686257364557704
                    ],
                    [
                        119.39014507519641,
                        34.655115837905655
                    ],
                    [
                        119.33572977691847,
                        34.692649209500175
                    ],
                    [
                        119.34801710233643,
                        34.699040560865626
                    ]
                ],
                "type": "LineString"
            }
        }
    ]
}

const lineSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON().readFeatures(lineJson))
})

const lineLayer = new ol.layer.Vector({
    source: lineSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red', // 线条颜色
            width: 5, // 线条宽度
            lineDash: [5, 10], // 线条样式，数组中的数字表示实线和虚线的长度
            lineCap: 'round', // 线条端点样式，可选值为butt、round、square
            lineJoin: 'round' // 线条连接处样式，可选值为bevel、round、miter
        })
    })

})


map.addLayer(lineLayer)
```
### 5.4.2 外部url读取

![1.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689727641139-64d7ff3b-4115-46dd-bff6-215273bfbd80.png#averageHue=%23d9e2c5&clientId=udf7e6ec8-b481-4&from=ui&id=u8eb7d143&originHeight=517&originWidth=837&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=447962&status=done&style=none&taskId=u29ce5643-efe7-4ad7-b8f4-be39e3aa349&title=)

```javascript
// 外部读取json数据
const polygonSource = new ol.source.Vector({
  url: './assets/geojson/polygon.json',
  format: new ol.format.GeoJSON()
})

const polygonLayer = new ol.layer.Vector({
  source: polygonSource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.5)'
    }),
    stroke: new ol.style.Stroke({
      width: 5,
      color: '#ffcc33',
    })
  })
})

map.addLayer(polygonLayer)
```
### 5.4.3 geoserver获取
```javascript
//使用geojson加载数据
const vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),

    url: function (extent) {
        return 'http://localhost:8080/geoserver/company/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=company%3AIndian_States&maxFeatures=50&srsname=EPSG:3857&bbox=' + extent.join(",") + ',EPSG:3857&outputFormat=application%2Fjson'
    },
    strategy: ol.loadingstrategy.bbox
})

const vectorLayer = new ol.layer.Vector({
    source: vectorSource
})

map.addLayer(vectorLayer)
```

### 5.4.4 热力图
![2.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689727836614-0c29b7bd-40e8-4495-9ed4-c37818503443.png#averageHue=%23a6e4b2&clientId=udf7e6ec8-b481-4&from=ui&id=u0e405395&originHeight=747&originWidth=1187&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1464132&status=done&style=none&taskId=u78e8d636-3e12-4e17-8f71-4de8be2983a&title=)
```json
{
  "type": "Feature",
  "properties": {
    "OBJECTID": 2,
    "DepartmentCode": "164450333",
    "VillageID": 5007,
    "WardID": null,
    "Code": "29565055008031140000HMPOLPUOFFPOS0002",
    "POL_STAID": 2,
    "POL_STAName": "Bruceept PS",
    "PSCode": "PS - 02"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      76.926339999683975,
      15.13819100027882
    ]
  }
},
```
### 5.4.5 经纬度线标
![3.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689727889543-8897d599-cc5f-4977-9a2d-cd793efae73c.png#averageHue=%23dbe6ce&clientId=udf7e6ec8-b481-4&from=ui&id=ube5ad3f6&originHeight=764&originWidth=1476&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=781426&status=done&style=none&taskId=u6c4ea48a-0a84-4adc-8a9c-ad57440083f&title=)
```javascript
const graticule = new ol.Graticule({
    map: map,
    showLabels: true,
})
```
### 5.4.6 作业
```javascript
Q. Create a map having 5 lines, 3 polygons and 10 points. 
  
 each line should be representaion of different road.
  (e.g. Highway, Villege Road, Rail road,etc. )
  
 each polygon should be a representation of different landuse
  (e.g. Residential area, Garden , Lake)

 points should be a combination of Atms and bus stops 
   and then put an image of that point as a marker
```

```javascript
//添加矢量图层
const lygSource = new ol.source.Vector({
    url: './assets/geojson/lyg.json',
    format: new ol.format.GeoJSON()
})


const lygLayer = new ol.layer.Vector({
    source: lygSource,
    style: (feature) => {
        const type = feature.getGeometry().getType()
        const properties = feature.getProperties()

        switch (type) {
            case 'LineString':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'skyblue',
                        width: 5
                    })
                })
            case 'Polygon':
                return new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.6)'
                    }),

                    stroke: new ol.style.Stroke({
                        color: 'pink',
                        width: 5
                    })
                })
            case 'Point':
                return new ol.style.Style({
                    image: new ol.style.Icon({
                        src: './assets/image/tiger.png',
                        scale: 0.05
                    })
                })
            default:
                break;

        }
    }

})

map.addLayer(lygLayer)

//获取所有layers
setTimeout(() => {
    const layers = map.getLayers().getArray()
    const line1 = layers[1].getSource().getFeatures()[0]
}, 2000)
```

## 5.5 事件交互
在OpenLayers中，可以使用事件交互来响应用户的交互操作，例如鼠标点击、移动、缩放等。以下是一些常用的事件交互：

- ol.interaction.Select：用于选择要素的交互。
- ol.interaction.Draw：用于绘制要素的交互。
- ol.interaction.Modify：用于修改要素的交互。
- ol.interaction.DragPan：用于拖拽地图的交互。
- ol.interaction.MouseWheelZoom：用于鼠标滚轮缩放地图的交互。
### 5.5.1 鼠标拖拽放大
![4.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689735471021-e004f599-fdf2-40a7-b481-d145d402710c.png#averageHue=%23dce4cf&clientId=udf7e6ec8-b481-4&from=ui&id=u473761d9&originHeight=337&originWidth=1111&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=357282&status=done&style=none&taskId=u55adfd03-2246-46ad-a8bd-7e83e2f6db0&title=)
```javascript
//事件交互
const dragBox = new ol.interaction.DragBox({})

//开始
dragBox.on('boxstart', (evt) => {
    console.log('boxstart');
})

//结束
dragBox.on('boxend', (evt) => {
    console.log('boxend');

    view.fit(dragBox.getGeometry().getExtent(), map.getSize())
})

map.addInteraction(dragBox)
```

### 5.5.2 拖拽加载geojson文件

![5.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689736229653-f12edb12-0d4e-43da-892a-3e7085820e44.png#averageHue=%23eaebe4&clientId=udf7e6ec8-b481-4&from=ui&id=uaeecddce&originHeight=646&originWidth=1509&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=233331&status=done&style=none&taskId=u34b30803-54d7-4bf0-83cd-ce0c6f5caec&title=)


![6.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1689736237122-2af358b6-f61d-4111-a6f5-d99a56ee49bd.png#averageHue=%23abd3de&clientId=udf7e6ec8-b481-4&from=ui&id=ude2e8a99&originHeight=501&originWidth=885&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=444040&status=done&style=none&taskId=ub1a4d1aa-6bbf-48d5-9af9-b779606fb0d&title=)

```javascript
const dragSource = new ol.source.Vector()
const dragLayer = new ol.layer.Vector({
    source: dragSource
})

map.addLayer(dragLayer)

const dragDrop = new ol.interaction.DragAndDrop({
    formatConstructors: [ol.format.GeoJSON],
    source: dragSource
})
map.addInteraction(dragDrop)
```

### 5.5.3  绘制图形 
```javascript
const drawSource = new ol.source.Vector()
const drawLayer = new ol.layer.Vector({
    source: drawSource
})
map.addLayer(drawLayer)

const draw = new ol.interaction.Draw({
    source: drawSource,
    type: 'Polygon',
    freehand: true
})


draw.on('drawend', (evt) => {
    console.log(evt.feature.getGeometry().getCoordinates());
})
map.addInteraction(draw)
```
# 六、geoserver
## 6.1  通用style设置
SLD是GeoServer中的一个重要概念，它代表着“样式层描述”（Styled Layer Descriptor）。SLD是一种XML格式的文件，用于描述地图图层的样式和渲染规则。通过SLD文件，可以定义地图图层的颜色、符号、标签、透明度等属性，以便在地图上显示和渲染地理数据。
SLD文件通常包含以下几个部分：

1. 命名空间和元素声明：定义SLD文件的命名空间和元素。
2. FeatureTypeStyle：定义地图图层的样式和渲染规则。
3. Rule：定义地图图层的渲染规则，包括符号、标签、透明度等属性。
4. Symbolizer：定义地图图层的符号，包括点、线、面等。

通过SLD文件，可以实现地图图层的高度自定义和灵活性。GeoServer支持SLD 1.0和SLD 1.1两个版本，用户可以根据需要选择不同的版本。

[Styling — GeoServer 2.24.x User Manual](https://docs.geoserver.org/main/en/user/styling/index.html)
## 6.2 openlayers预览500

- 版本：jdk-17.0.5、geoserver - 2.23.1
- 解决方法：命令行启动，java -Djava.awt.headless=true -jar start.jar
## 6.3 跨域设置
[geoserver安装及跨域问题解决方案 - 掘金](https://juejin.cn/post/7088484003954556964)

![10.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690181141384-13e04d5c-1f03-441e-a4d8-79626a1386b9.png#averageHue=%23292d36&clientId=u242b3417-2100-4&from=ui&id=ue03b533d&originHeight=510&originWidth=1190&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=60286&status=done&style=none&taskId=ucb6b9f86-7b26-47c1-b670-0e265360218&title=)

![10.5.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690181148410-73b0c564-e9da-4f83-80d6-ff89487918b9.png#averageHue=%23292d36&clientId=u242b3417-2100-4&from=ui&id=u1684c7b2&originHeight=420&originWidth=1195&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=53997&status=done&style=none&taskId=uf70c7205-5197-4f8f-bcac-aa91162a9bf&title=)

![11.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690181159109-bea0ebde-f27f-4fd5-8d2b-4b94db1252f1.png#averageHue=%23292d36&clientId=u242b3417-2100-4&from=ui&id=u3fca1060&originHeight=154&originWidth=655&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=14388&status=done&style=none&taskId=u2f736fe9-ae5c-4a42-9b0b-905f1d42d52&title=)
# 七、Postgre SQL
## 7.1 前言
[Windows 上安装 PostgreSQL | 菜鸟教程](https://www.runoob.com/postgresql/windows-install-postgresql.html)
[WINDOWS 11 环境下安装POSTGRESQL](https://zhuanlan.zhihu.com/p/400220265)

:::info

- 电脑：windows 11
- 版本：10.23
:::
## 7.2 基础sql语句
### 7.2.1 增加
```sql
INSERT INTO product_mobile(
  name, description, quantity, instock, price, front_camera)
	VALUES ('xiaomi11','非常好',60,true,2000,1200)
```
### 7.2.2 删除
```sql
delete from product_mobile
where id=3
```
### 7.2.3 修改
```sql
update product_mobile
set description = '一般'
where id=1
```
### 7.2.4 查询
```sql
select * from product_mobile
where quantity >=60 and price<=2200 
```
## 7.3 高级语法

## 7.4  bug
[https://gis.stackexchange.com/questions/331653/error-could-not-load-library-c-program-files-postgresql-11-lib-rtpostgis-2-5](https://gis.stackexchange.com/questions/331653/error-could-not-load-library-c-program-files-postgresql-11-lib-rtpostgis-2-5)
```sql
无法加载库 "D:/GIS/postgresql/10/lib/rtpostgis-2.4.dll": The specified module could not be found.
```
## 7.5 postgis
qgis制图导入postgre sql数据库之后，可以使用postgis 语句对数据进行处理
[Home](https://postgis.net/)
### 7.5.1 查询城市
```sql
SELECT  allcities.*
FROM countries,allcities
WHERE ST_Contains(ST_Buffer(countries.geom,0.01),allcities.geom)
AND countries.admin = 'India';
```

![12.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690352262960-9eb71cda-7bf8-4f2c-88c5-199a90ca7eb5.png#averageHue=%23e4e9e7&clientId=uef5ec684-e932-4&from=ui&id=u51c3b818&originHeight=329&originWidth=807&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=109406&status=done&style=none&taskId=u5b636c10-e3aa-406a-b491-cf212ce0193&title=)

### 7.5.2 转换单个区域坐标系
```sql
SELECT  allcities.*
FROM countries,allcities
WHERE ST_Contains(ST_Buffer(ST_Transform(countries.geom,3857),1500),ST_Transform(allcities.geom,3857))
AND countries.admin = 'India';
```

- 在 EPSG:3857 坐标系中，距离的单位是米（m）。
- 在 EPSG:4326 坐标系中，距离的单位是度（degree）。
### 7.5.3 查询单个区域
```sql
SELECT ST_Area(ST_Transform(geom,3857)) FROM countries where admin = 'India'
```
### 7.5.4 计算点距离
```sql
SELECT ST_Distance(ST_Transform(a.geom,3857), ST_Transform(b.geom,3857))
FROM allcities a,allcities b
where a.name = 'New Delhi' and b.name = 'Mumbai'
```
# 八、php-ajax
## 8.1 XAMPP
[XAMPP Installers and Downloads for Apache Friends](https://www.apachefriends.org/)

XAMPP 是一个免费且易于安装的跨平台 Web 服务器解决方案（最流行的php开发环境），它包含 Apache、MySQL、PHP 和 Perl。它可以在 Windows、Linux 和 macOS 上运行，并且非常适合开发和测试 Web 应用程序。

这个下面没看



# 九、leaflet
## 9.1 前言
[Leaflet — an open-source JavaScript library for interactive maps](https://leafletjs.com/)
Leaflet是一个开源的JavaScript库，用于创建交互式地图（**数据纬经度**）。它是一个轻量级的库，具有高度的可定制性和可扩展性，可以在各种设备上运行。Leaflet支持各种地图提供商，包括OpenStreetMap、Mapbox和Google Maps等。它还提供了许多功能，如地图缩放、标记、弹出窗口、路径绘制等。
**Leaflet默认使用的坐标系是WGS84（World Geodetic System 1984），它的EPSG代码是4326。**
## 9.2 切换底图
[Leaflet Provider Demo](https://leaflet-extras.github.io/leaflet-providers/preview/)

## 9.3 绘制图形
```javascript
//加载polygon
const latlngs = [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]];

const polygon = L.polygon(latlngs, { color: 'red', fillColor: 'skyblue' }).addTo(map);

map.fitBounds(polygon.getBounds());
```


![13.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690369427258-6c541a11-94f7-4601-bf66-3da701516c25.png#averageHue=%23b6cab4&clientId=uef5ec684-e932-4&from=ui&id=u4317c651&originHeight=706&originWidth=1128&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=221730&status=done&style=none&taskId=ub9843cff-0aab-447f-a469-fe075fbfa89&title=)
## 9.4 图形标记
Leaflet的Marker是一个用于在地图上添加标记的类。它有以下特点：

- 可以设置标记的位置、图标、大小、旋转角度等属性。
- 可以添加弹出窗口，当用户点击标记时会弹出。
- 可以设置标记的拖拽属性，允许用户拖动标记。
- 可以设置标记的动画效果，如弹跳、旋转等。
- 可以设置标记的事件监听器，如点击、拖拽等事件。
- 可以通过方法对标记进行操作，如移动、删除等。
- 可以与其他Leaflet类（如地图、图层等）进行交互，实现更复杂的功能。
```javascript
const map = L.map('map').setView([39.56, 116.20], 5);

L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'bosom'
}).addTo(map);

const dragMaker = L.marker([39.56, 116.20], {
    title: '北京',
    draggable: true

})

dragMaker.addTo(map)

dragMaker.on('dragstart', (e) => {
    console.log('dragstart', e);
})


dragMaker.on('dragend', (e) => {
    console.log('dragend', e);
})

dragMaker.on('drag', (e) => {
    console.log('drag', e);
})

// movestart moveend
dragMaker.on('movestart', (e) => {
    console.log('movestart', e);
})

dragMaker.on('moveend', (e) => {
    console.log('moveend', e);
})

```
## 9.5 加载geojson
```javascript
const map = L.map('map').setView([39.56, 116.20], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'bosom'
}).addTo(map);


const data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "北京"
            },
            "geometry": {
                "coordinates": [
                    116.42586641481421,
                    39.929189418847955
                ],
                "type": "Point"
            },
            "id": 0
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    120.28014276439222,
                    36.069516549809705
                ],
                "type": "Point"
            },
            "id": 1
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    121.38563288016263,
                    31.22203121318421
                ],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    119.14820726027642,
                    34.6321139210345
                ],
                "type": "Point"
            }
        }
    ]
}

L.geoJSON(data, {}).bindPopup(function (layer) {
    console.log(layer.feature.properties);
    return '111'
}).addTo(map);
```

## 9.6 自定义maker

![1.png](https://cdn.nlark.com/yuque/0/2023/png/27367619/1690420793773-5b1598ba-8902-4f43-bf8c-e5ecb5cdcd44.png#averageHue=%23e3e5d7&clientId=u91bdb054-e12e-4&from=ui&id=uc7ee9e04&originHeight=538&originWidth=1206&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=638652&status=done&style=none&taskId=ub2adc5ac-66c8-41b4-b06a-65a96a413e2&title=)
```javascript
const myIcon = L.icon({
    iconUrl: './assets/icon/gugong.png',
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [10, - 100],
})


// 39.91668279062602, 116.39722805103676
const maker = L.marker([39.91668279062602, 116.39722805103676], { icon: myIcon }).addTo(map)
maker.bindPopup('<h1>故宫博物院</h1>   <img src="./assets/icon/detail.png" alt="" width="200">').openPopup()
maker.bindTooltip("my tooltip text").openTooltip()
```
# 十、mapbox
[大屏地图：从瓦片到引擎，到手把手实战 - 掘金](https://juejin.cn/post/7171275204801331214)

mapbox 在 2022年6月 新出的规定，注册账号必须绑定一张国际信用卡。这个要求，就让很多国内小伙伴想试用的成本大大提升了。

Mapbox 是一个提供地图和地理空间数据的平台，它提供了一系列的 API 和 SDK，可以用于在 Web、移动设备和桌面应用程序中显示地图、进行地理空间分析和可视化等操作。
Mapbox 的地图数据是基于开放式数据源的，包括 OpenStreetMap 和其他开放式数据源。Mapbox 还提供了一些工具和服务，可以用于创建和编辑地图数据，例如 Mapbox Studio 和 Mapbox Editor。
Mapbox 的 API 和 SDK 支持多种编程语言和平台，包括 JavaScript、iOS、Android、Unity 等。开发者可以使用这些工具和服务，快速构建出具有地图和地理空间数据的应用程序。
除了地图和地理空间数据，Mapbox 还提供了一些其他的服务，例如地理编码、路线规划、地理围栏等。这些服务可以帮助开发者更方便地进行地理空间分析和应用程序开发。
总的来说，Mapbox 是一个功能强大的地图和地理空间数据平台，可以帮助开发者快速构建出具有地图和地理空间数据的应用程序，并提供了一系列的工具和服务，方便开发者进行地理空间分析和可视化。



