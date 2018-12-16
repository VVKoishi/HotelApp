<template>
  <div>
    <baidu-map class="map" center="成都">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
    <span style="font-size: 20px; ">百度地图</span>
  </div>
</template>
<style>
.map {
  width: 100%;
  height: 400px;
}
</style>