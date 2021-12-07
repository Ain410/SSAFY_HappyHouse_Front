<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ house.aptName }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col>
        <!-- <div id="kakaoApi" style="float: none; margin: 0 auto">
          <div id="map" style="width: 500px; height: 250px"></div></div
      > -->
        <div id="dmap">
          <kakao-map-2 ref="kmap" @child="closest"></kakao-map-2>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >일련번호 : {{ house.aptCode }}</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ house.aptName }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.dongName }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning">지번 : {{ house.jibun }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 :
          {{
            (parseInt(house.recentPrice.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning"
          >어린이집 : {{ closeKinder.childHouseNm }}<br />
          전화번호 : {{ closeKinder.childHouseTelephoneNumber }}<br />
          주소 : {{ closeKinder.rdnmadr }}</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import KakaoMap2 from "@/views/KakaoMap2.vue";
const houseStore = "houseStore";
const kinderStore = "kinderStore";

export default {
  name: "HouseDetail",
  components: {
    KakaoMap2,
  },
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapState(kinderStore, ["kinders"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  data() {
    return {
      container: null,
      options: {},
      check: false,
      closeKinder: {},
    };
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  methods: {
    marker() {
      this.$refs.kmap.displayMarkers(this.house);
    },
    marker2() {
      this.$refs.kmap.displayMarkers2(this.kinders.items);
    },
    closest(minIndex) {
      this.closeKinder = this.kinders.items[minIndex];
    },
  },

  watch: {
    house: function () {
      this.marker();
    },
    kinders: function () {
      this.marker2();
    },
  },
};
</script>

<style scoped>
#kakaoApi {
  width: 500px;
  height: 350px;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
