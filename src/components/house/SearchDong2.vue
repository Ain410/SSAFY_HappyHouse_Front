<template>
  <div class="container text-center mt-3">
    <div class="col-lg-8 mx-auto">
      <h2 class="p-3 mb-3 shadow bg-light">
        <mark class="orange">동별검색</mark>
      </h2>
    </div>
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
          @change="dongList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          v-model="dongCode"
          :options="dongs"
          @change="searchApt"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3" align="left">
        <b-button variant="outline-primary" @click="searchApt">검색</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6" align="left" id="lists">
        <b-container
          v-if="houses && houses.length != 0"
          class="bv-example-row mt-3"
        >
          <house-list-row
            v-for="(house, index) in houses"
            :key="index"
            :house="house"
          />
        </b-container>
        <b-container v-else class="bv-example-row mt-3">
          <b-row>
            <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
          </b-row>
        </b-container>
      </b-col>

      <b-col cols="6">
        <house-detail></house-detail>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import { mapState, mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";
export default {
  name: "Home",
  components: {
    HouseListRow,
    HouseDetail,
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
    // this.CLEAR_SIDO_LIST();
    // this.CLEAR_GUGUN_LIST();
    // this.CLEAR_HOUSE_LIST();
    // this.CLEAR_DONG_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
      "getHouseByDong",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_HOUSE_LIST();
      this.gugunCode = null;

      if (this.sidoCode) {
        this.getGugun(this.sidoCode);
      }
    },

    dongList() {
      // console.log(this.gugunCode);
      this.CLEAR_DONG_LIST();
      this.CLEAR_HOUSE_LIST();
      this.dongCode = null;
      if (this.gugunCode) {
        this.getDong(this.gugunCode);
        // console.log(this.gugunCode);
      }
    },
    // searchApt() {
    //   if (this.gugunCode) {
    //     console.log("구군코드: " + this.gugunCode);
    //     console.log("동코드: " + this.dongCode);
    //     this.getHouseList(this.gugunCode);
    //   }
    // },
    searchApt() {
      if (this.dongCode) {
        console.log("구군코드: " + this.gugunCode);
        console.log("동코드: " + this.dongCode);
        this.getHouseByDong(this.dongCode);
        console.log("집 정보", this.houses);
      }
    },
  },
};
</script>

<style scoped>
#lists {
  height: 700px;
  overflow: auto;
}
</style>
