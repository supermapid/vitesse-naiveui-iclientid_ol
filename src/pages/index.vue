<script setup lang="ts">
import Map from "ol/Map"
import View from "ol/View"
import { Tile as TileLayer } from "ol/layer"
import { OSM } from "ol/source"

const map = ref<Map>()
const mapRef = ref<HTMLElement>()

const FULL_VIEW = {
  center: [117.25620141667574, -0.31222948067971146],
  zoom: 5,
  projection: "EPSG:4326"
}

// @ts-expect-error placeholder if needed
function goToFullExtent() {
  if (map.value == null) {
    return
  }
  map.value.getView().setCenter(FULL_VIEW.center)
  map.value.getView().setZoom(FULL_VIEW.zoom)
}

onMounted(() => {
  map.value = new Map({
    target: mapRef.value,
    view: new View(FULL_VIEW)
  })

  const osmBasemap = new TileLayer({
    source: new OSM(),
    preload: Number.POSITIVE_INFINITY,
    visible: true
  })
  map.value.addLayer(osmBasemap)
})
</script>

<template>
  <div id="map" ref="mapRef" class="absolute w-full h-full"></div>
</template>

<style>
@import "ol/ol.css";

#map {
  top: 0;
  left: 0;
}

.ol-zoom {
  left: unset;
  right: 8px;
}
</style>
