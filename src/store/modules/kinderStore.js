import { kinderList } from "@/api/kinder.js";

const kinderStore = {
  namespaced: true,
  state: {
    kinders: [],
  },

  getters: {},

  mutations: {
    SET_KINDER_LIST: (state, kinders) => {
      state.kinders = kinders;
    },
    CLEAR_KINDER_LIST: (state) => {
      state.kinders = [];
    },
  },

  actions: {
    getKinderList: ({ commit }, signguNm) => {
      const SERVICE_KEY =
        "vv4t2ZzF16CxOZp79KKYfh/R0GOIlv9avZBDYmd2n9GDrl7j6OwsybFDJmBtr+EQQK5OlFmkUz4+vL9tfpKRXw==";
      const params = {
        signguNm: signguNm,
        pageNo: 1,
        numOfRows: 50,
        type: "json",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      kinderList(
        params,
        (response) => {
          //console.log(response.data.response.body.items);
          commit("SET_KINDER_LIST", response.data.response.body);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default kinderStore;
