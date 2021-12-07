import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";
import BoardDelete from "@/components/board/BoardDelete.vue";

import User from "@/views/User.vue";
import UserJoin from "@/components/user/UserJoin.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserMypage from "@/components/user/UserMypage.vue";
import UpdatePage from "@/components/user/UpdatePage.vue";

import House from "@/views/House.vue";
// import SearchDong from "@/components/house/SearchDong";
import SearchDong2 from "@/components/house/SearchDong2";
// import SearchApt from "@/components/house/SearchApt";
import SearchApt2 from "@/components/house/SearchApt2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        component: BoardWrite,
      },
      {
        path: "detail/:articleno",
        name: "BoardView",
        component: BoardView,
      },
      {
        path: "update/:articleno",
        name: "BoardUpdate",
        component: BoardUpdate,
      },
      {
        path: "delete/:articleno",
        name: "BoardDelete",
        component: BoardDelete,
      },
    ],
  },

  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "signup",
        name: "SignUp",
        component: UserJoin,
      },
      {
        path: "login",
        name: "Login",
        component: UserLogin,
      },
      {
        path: "mypage",
        name: "Mypage",
        component: UserMypage,
      },
      {
        path: "updatepage/:userid",
        name: "UpdatePage",
        component: UpdatePage,
      },
    ],
  },

  {
    path: "/house",
    name: "House",
    component: House,
    children: [
      {
        path: "searchdong",
        name: "SearchDong",
        component: SearchDong2,
        // component: SearchDong,
      },
      {
        path: "searchapt",
        name: "SearchApt",
        component: SearchApt2,
        // component: SearchApt,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
