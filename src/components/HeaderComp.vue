<template>
  <div class="container">
    <header id="index_header" class="jumbotron text-center mb-1">
      <h4>행복한 우리 집</h4>
    </header>
    <!-- nav start -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark rounded">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'SearchDong' }" class="link"
              >동별 검색</router-link
            >
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'SearchApt' }" class="link"
              >아파트별 검색</router-link
            >
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'Board' }" class="link">Q&A</router-link>
          </a>
        </li>

        <!-- <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'QnaBoard' }" class="link"
              >Q&A</router-link
            >
          </a>
        </li> -->

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            >{{ userInfo.username }}({{ userInfo.userid }})님
            환영합니다.</b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link
              :to="{ name: 'Mypage' }"
              class="link align-self-center"
              >내정보보기</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item class="align-self-center"
            ><router-link
              :to="{ name: 'SignUp' }"
              class="link align-self-center"
              >회원가입</router-link
            ></b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link :to="{ name: 'Login' }" class="link align-self-center"
              >로그인</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      alert("로그아웃 되었습니다.");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
a:hover {
  text-decoration: none;
  font-weight: bold;
}
</style>
