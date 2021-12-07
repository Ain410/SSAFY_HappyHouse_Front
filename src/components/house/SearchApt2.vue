<template>
  <div class="container text-center mt-3">
    <div class="col-lg-8 mx-auto">
      <h2 class="p-3 mb-3 shadow bg-light">
        <mark class="orange">아파트 검색 </mark>
      </h2>
    </div>

    <div class="card col-sm-12 mt-1" style="min-height: 850px">
      <div class="card-body">
        <b-row class="mt-4 mb-4 text-center">
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
              @change="searchApt"
            ></b-form-select>
          </b-col>
        </b-row>

        <div class="m-1 row">
          <form
            id="searchform"
            class="form-inline"
            method="get"
            onsubmit="return false"
          >
            <input
              type="text"
              class="ml-1 form-control"
              id="sword"
              name="word"
              placeholder="아파트 명 입력"
              v-model="sapt"
              @keyup.enter="searchByName"
            />
            <button
              type="button"
              id="searchBtn"
              class="ml-1 btn btn-outline-primary"
              @click="searchByName"
            >
              검색
            </button>
          </form>
        </div>
        <table class="table mt-2">
          <colgroup>
            <col width="100" />
            <col width="200" />
            <col width="250" />
            <col width="120" />
            <col width="120" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>아파트이름</th>
              <th class="text-center">주소</th>
              <th>건축연도</th>
              <th>최근거래금액</th>
            </tr>
          </thead>
          <tbody id="searchResult">
            <tr v-for="(house, index) in sbn" :key="index">
              <td>{{ house.일련번호 }}</td>
              <td>{{ house.아파트 }}</td>
              <td>{{ house.도로명 }} {{ house.지번 }}</td>
              <td>{{ house.건축년도 }}</td>
              <td>
                {{
                  (parseInt(house.거래금액.replace(",", "")) * 10000) | price
                }}원
              </td>
            </tr>
          </tbody>
        </table>
        <div id="map" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   name: "SearchApt",
// };
import { mapState, mapActions, mapMutations } from "vuex";
// import KakaoMap from "@/views/KakaoMap.vue";

const houseStore = "houseStore";

export default {
  name: "Home",
  components: {
    // KakaoMap,
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      sapt: "",
      sbn: [],
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      this.sapt = "";
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;

      if (this.sidoCode) {
        this.getGugun(this.sidoCode);
      }
    },

    searchApt() {
      this.sapt = "";
      if (this.gugunCode) {
        console.log("구군코드: " + this.gugunCode);
        console.log("동코드: " + this.dongCode);
        this.getHouseList(this.gugunCode);
      }
    },
    searchByName() {
      this.sbn = [];
      for (var i = 0; i < this.houses.length; i++) {
        if (this.houses[i].아파트.includes(this.sapt)) {
          this.sbn.push(this.houses[i]);
        }
      }
      console.log(this.sbn);
    },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
