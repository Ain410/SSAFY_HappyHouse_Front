<template>
  <div class="container">
    <b-row class="mt-4 mb-4 text-center">
      <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
      <b-col class="sm-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="dongList"
        ></b-form-select>
      </b-col>
      <!-- <b-col class="sm-3">
        <b-form-select
          v-model="dongCode"
          :options="dongs"
          @change="searchApt"
        ></b-form-select>
      </b-col> -->
      <b-col class="sm-3" align="left">
        <b-button variant="outline-primary" @click="searchApt">검색</b-button>
      </b-col>
    </b-row>
    <div id="kakaoApi" style="float: none; margin: 0 auto">
      <div id="map" style="width: 1000px; height: 500px"></div>
    </div>
    <kakao-map ref="kmap"></kakao-map>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import KakaoMap from "@/views/KakaoMap.vue";

const houseStore = "houseStore";

export default {
  name: "Home",
  components: {
    KakaoMap,
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
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
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;

      if (this.sidoCode) {
        this.getGugun(this.sidoCode);
      }
    },

    dongList() {
      // console.log(this.gugunCode);
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) {
        this.getDong(this.gugunCode);
        // console.log(this.gugunCode);
      }
    },
    searchApt() {
      if (this.gugunCode) {
        console.log("구군코드: " + this.gugunCode);
        console.log("동코드: " + this.dongCode);
        this.getHouseList(this.gugunCode);
        for (var i = 0; i < this.houses.length; i++) {
          console.log("집배열", this.houses[i].법정동 + this.houses[i].지번);
        }
      }
    },
    marker() {
      this.$refs.kmap.displayMarkers2(this.houses);
    },
  },

  watch: {
    houses: function () {
      this.marker();
    },
  },
};
</script>
