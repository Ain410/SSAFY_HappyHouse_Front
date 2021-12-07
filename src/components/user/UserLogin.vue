<template>
  <div class="container text-center mt-3">
    <div class="col-lg-8 mx-auto">
      <h2 class="p-3 mb-3 shadow bg-light">
        <mark class="orange">로그인</mark>
      </h2>
      <form id="loginform" class="text-left mb-3" method="post" action="">
        <div class="form-group form-check text-right">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              id="idsave"
              name="idsave"
            />
            아이디저장
          </label>
        </div>

        <div class="form-group">
          <label for="userid">아이디</label>
          <input
            type="text"
            class="form-control"
            id="userid"
            v-model="user.userid"
            placeholder=""
            required
          />
        </div>
        <div class="form-group">
          <label for="userpwd">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="userpwd"
            v-model="user.userpwd"
            placeholder=""
            required
          />
        </div>
        <div class="text-danger mb-2"></div>
        <div class="form-group text-center">
          <button
            type="button"
            id="loginBtn"
            class="btn btn-outline-warning"
            @click="confirm"
          >
            로그인
          </button>
          <button
            type="button"
            id="mvRegisterBtn"
            class="btn btn-outline-primary"
          >
            <router-link :to="{ name: 'SignUp' }">회원가입</router-link>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "Home" });
      } else {
        alert("아이디나 비밀번호를 확인해주세요");
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style></style>
