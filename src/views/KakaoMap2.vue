<template>
  <div>
    <div id="kakaoApi" style="float: none; margin: 0 auto">
      <div id="map"></div>
    </div>
    <div id="check">
      <input type="checkbox" v-model="check" />어린이집 보기<br />
      <button @click="makeMin">가까운 어린이집 정보 보기</button>
    </div>
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
      check: true,
      selected: [],
      radi: 1000,
      distArr: [],
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
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d1dfd369ff7380e72beddb900be4f348&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      this.container = document.getElementById("map");
      this.options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 5,
      };

      this.map = new kakao.maps.Map(this.container, this.options);
    },
    displayMarkers(house) {
      var map = new kakao.maps.Map(this.container, this.options);
      this.map = map;
      var geocoder = new kakao.maps.services.Geocoder();
      this.selected = [];
      var select = this.selected;
      var housename = house.aptName;
      var houseadress =
        house.sidoName + house.gugunName + house.dongName + house.jibun;
      console.log(housename);
      // console.log(this.house.lat);
      geocoder.addressSearch(
        house.dongName + " " + house.jibun,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(coords);
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            select.push(marker);
            var infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                housename +
                `<br>` +
                `<span>` +
                houseadress +
                `</span>` +
                "</div>",
            });
            infowindow.open(map, marker);

            var moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
            map.panTo(moveLatLon);
            // this.panTo(result[0].y, result[0].x);
            map.setCenter(coords);
          }
        }
      );
    },

    displayMarkers2(houses) {
      // console.log("houses : ", houses);
      var map = this.map;
      var geocoder = new kakao.maps.services.Geocoder();
      var addressArray = [];
      var kindername = [];
      //var check = this.check;
      this.markers = [];
      var markers = this.markers;
      // console.log(this.selected);
      var center = this.selected[0];
      var radius = this.radi; //단위 : 미터
      var distArray = [];
      for (var i = 0; i < houses.length; i++) {
        if (houses[i].rdnmadr == "null") {
          addressArray.push(
            houses[i].ctprvnNm +
              " " +
              houses[i].signguNm +
              " " +
              houses[i].childHouseNm
          );
          kindername.push(houses[i].childHouseNm);
        } else {
          addressArray.push(houses[i].rdnmadr);
          kindername.push(houses[i].childHouseNm);
        }
        // console.log(houses[i].childHouseNm);
      }
      console.log("addressArray : ", addressArray.length);

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(30, 22), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(20, 35) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      for (var j = 0; j < addressArray.length; j++) {
        geocoder.addressSearch(addressArray[j], function (result, status) {
          var aptname = result[0].road_address.building_name;
          var aptaddress = result[0].road_address.address_name;

          if (!aptname) aptname = "어린이집";

          // console.log("결과", result[0]);
          // console.log("결과값", result[0].address.address_name);
          // var aptadress = result[0].road_address.address_name;
          // if (!result[0].road_address.building_name) {
          //   aptname = result[0].road_address.address_name;
          // } else {
          //   aptname = result[0].road_address.building_name;
          // }
          // var aptname = kindername[j];
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // console.log(coords);
            // console.log(result[0]);
            var markerImage = new kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            );

            //마커와 아파트 거리 구하기
            var c1 = center.getPosition();
            var c2 = coords;
            var poly = new kakao.maps.Polyline({
              path: [c1, c2],
            });
            var dist = poly.getLength();
            //1000m이하만 마커 생성
            distArray.push(dist);
            if (dist < radius) {
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage,
              });
              markers.push(marker);
            } else {
              return;
            }

            var overlay = new kakao.maps.CustomOverlay({
              content:
                '<div class="wrap" >' +
                '    <div class="info">' +
                '        <div class="title">' +
                aptname +
                "        </div>" +
                '        <div class="body">' +
                aptaddress +
                "<br>거리 : " +
                parseInt(dist) +
                "M</div>" +
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
            // map.setCenter(coords);
          }
        });
      }
      this.distArr = distArray;
    },
    makeMin() {
      var min = 10000;
      var minIndex = 0;
      for (var t = 0; t < this.distArr.length; t++) {
        if (min > this.distArr[t]) {
          min = this.distArr[t];
          minIndex = t;
        }
      }
      this.$emit("child", minIndex);
    },
    showMarker() {
      if (this.check == true) {
        for (var k = 0; k < this.markers.length; k++) {
          this.markers[k].setMap(this.map);
        }
      } else {
        for (var n = 0; n < this.markers.length; n++) {
          this.markers[n].setMap(null);
        }
      }
    },
  },
  watch: {
    check: function () {
      this.showMarker();
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
