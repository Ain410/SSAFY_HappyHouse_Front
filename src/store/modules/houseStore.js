import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  houseList2,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },

    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = [];
    },

    SET_HOUSE_LIST: (state, houses) => {
      console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          console.log("시도");
          console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);

          console.log("구군");
          console.log(data);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          console.log("동");
          console.log(data);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getHouseByDong: ({ commit }, dongCode) => {
      const params = {
        dong: dongCode,
      };
      houseList2(
        params,
        ({ data }) => {
          // console.log(commit, response);
          console.log("동");
          console.log(data);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getHouseList: ({ commit }, gugunCode) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      // const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      const SERVICE_KEY =
        "DbW2OOZcJfqbqg13VGMneX9kr6r6VX8LuW8%2Fs92R5Th%2B7yCLB5o%2FobHDYQgQOTk%2B%2FZdT9evkYjAEHj4ehOpIsQ%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
        numOfRows: "20",
      };
      houseList(
        params,
        (response) => {
          // console.log(response.data.response.body.items.item);
          // console.log(dongCode);
          // console.log(response);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
