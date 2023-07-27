// 定义视图
const view = new ol.View({
    center: [9446868.296874993, 2571872.496798376],
    zoom: 4
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