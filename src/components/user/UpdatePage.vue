<template>
  <div class="container text-center mt-3">
    <div class="col-lg-8 mx-auto">
      <h2 class="p-3 mb-3 shadow bg-light">
        <mark class="orange">회원가입</mark>
      </h2>
      <form id="memberform" class="text-left mb-3">
        <input type="hidden" id="email" name="email" />
        <div class="form-group">
          <label for="username">이름</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="user.username"
            placeholder="이름입력"
            required
          />
        </div>
        <div class="form-group">
          <label for="userid">아이디</label>
          <input
            type="text"
            class="form-control"
            id="userid"
            :value="userInfo.userid"
            placeholder="아이디입력"
            readonly
          />
          <div id="idresult" class="mt-1"></div>
        </div>
        <div class="form-group">
          <label for="userpwd">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="userpwd"
            v-model="user.userpwd"
            placeholder="비밀번호입력"
            required
          />
        </div>
        <div class="form-group">
          <label for="pwdcheck">비밀번호재입력</label>
          <input
            type="password"
            class="form-control"
            id="pwdcheck"
            v-model="user.userpwchk"
            placeholder="비밀번호재입력"
            required
          />
        </div>

        <div class="form-group">
          <label for="emailid">이메일</label><br />
          <div id="email" class="custom-control-inline">
            <input
              type="text"
              class="form-control"
              id="emailid"
              v-model="user.email"
              placeholder="이메일아이디입력"
              size="25"
            />
            @
            <select class="form-control" id="emaildomain" name="emaildomain">
              <option value="ssafy.com">싸피</option>
              <option value="naver.com">네이버</option>
              <option value="kakao.com">카카오</option>
              <option value="google.com">구글</option>
            </select>
          </div>
        </div>
        <div class="form-group text-center">
          <button
            type="button"
            id="registerBtn"
            class="btn btn-outline-primary"
            @click="modifyBtn"
          >
            수정
          </button>
          <button type="button" class="btn btn-outline-danger" @click="goback">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import http from "@/util/http-common";

const memberStore = "memberStore";
export default {
  name: "UpdatePage",

  data() {
    return {
      user: {
        userid: "",
        userpwd: "",
        userpwchk: "",
        username: "",
        email: "",
      },

      userpwd: "",
      userpwchk: "",
      passwordck: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    modifyBtn() {
      let err = true;
      let msg = "";
      if (!this.user.username) {
        msg = "이름을 입력해주세요";
        err = false;
      } else if (!this.user.userpwd) {
        msg = "패스워드를 입력해주세요";
        err = false;
      } else if (!this.user.userpwchk) {
        msg = "패스워드를 확인해주세요";
        err = false;
      } else if (this.user.userpwd != this.user.userpwchk) {
        msg = "패스워드를 확인해주세요";
        err = false;
      }

      if (!err) alert(msg);
      else {
        this.modify();
      }
    },

    goback() {
      this.$router.push({ name: "Mypage" });
    },

    modify() {
      http
        .put(`/user/modify`, {
          username: this.user.username,
          userid: this.userInfo.userid,
          userpwd: this.user.userpwd,
          email: this.user.email,
        })
        .then(({ data }) => {
          if (data === "success") {
            let msg = "수정에 성공하였습니다. 다시 로그인해주세요";
            alert(msg);
            // this.$router.push({ name: "Home" });
            this.dologout();
          }
        });
    },

    dologout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
