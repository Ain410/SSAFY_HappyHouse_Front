<template>
  <div id="kakaoApi" style="float: none; margin: 0 auto">
    <div id="map" style="width: 1000px; height: 500px"></div>
    <!-- <button @click="parking">addtion</button> -->
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
      container: null,
      options: {},
      overlay: null,
    };
  },

  created() {},

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d1dfd369ff7380e72beddb900be4f348&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      this.container = document.getElementById("map");
      this.options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 7,
      };

      this.map = new kakao.maps.Map(this.container, this.options);
    },
    displayMarkers2(houses) {
      // console.log("houses : ", houses);
      var map = new kakao.maps.Map(this.container, this.options);
      var geocoder = new kakao.maps.services.Geocoder();
      var addressArray = [];

      for (var i = 0; i < houses.length; i++) {
        addressArray.push(houses[i].법정동 + " " + houses[i].지번);
      }
      console.log("addressArray : ", addressArray[0]);

      for (var j = 0; j < addressArray.length; j++) {
        geocoder.addressSearch(addressArray[j], function (result, status) {
          var aptname = result[0].road_address.building_name;
          var aptadress = result[0].road_address.address_name;
          if (!aptname) aptname = result[0].road_address.address_name;

          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(coords);
            console.log(result[0]);
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            var overlay = new kakao.maps.CustomOverlay({
              content:
                '<div class="wrap" >' +
                '    <div class="info">' +
                '        <div class="title">' +
                aptname +
                "        </div>" +
                '        <div class="body">' +
                aptadress +
                "</div>" +
                "    </div>" +
                "</div>" +
                "<style>" +
                ".wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}" +
                ".wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}" +
                ".wrap * {padding: 0;margin: 0;}" +
                ".wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}" +
                ".info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}" +
                "info .body {position: relative;overflow: hidden; font-size: 18px; }" +
                ".info .desc {position: relative;margin: 16px 0 0 90px;height: 75px;}" +
                ".desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}" +
                ".info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}" +
                "</style>",
              // map: map,
              position: marker.getPosition(),
            });

            // var infowindow = new kakao.maps.InfoWindow({
            //   content: aptname,
            // });

            // kakao.maps.event.addListener(marker, "click", function () {
            //   cnt++;
            //   if (cnt % 2 == 1) infowindow.open(map, marker);
            //   if (cnt % 2 == 0) {
            //     infowindow.close();
            //   }
            // });
            var cnt = 0;
            kakao.maps.event.addListener(marker, "click", function () {
              cnt++;
              if (cnt % 2 == 1) overlay.setMap(map);
              else overlay.setMap(null);
            });

            map.setCenter(coords);
          }
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 500px;
  height: 350px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
