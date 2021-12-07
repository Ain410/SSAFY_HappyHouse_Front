<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-jumbotron>
          <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="0"></b-col>
              <b-col cols="2" align-self="end">아이디 </b-col
              ><b-col cols="3" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="0"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="3" align-self="start">{{
                userInfo.username
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="0"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="3" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="0"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.joindate
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" href="#" class="mr-1" @click="ModifyUser"
            >정보수정</b-button
          >
          <b-button variant="danger" href="#" @click="DeleteBtn"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { deleteUser } from "@/api/member";
import http from "@/util/http-common";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    ModifyUser() {
      this.$router.push({ name: "UpdatePage" });
    },
    // DeleteBtn() {
    //   if (confirm("삭제하시겠습니까?")) {
    //     deleteUser(this.userInfo.userid, () => {
    //       this.$router.push({ name: "Home" });
    //     });
    //   }
    // },

    DeleteBtn() {
      // console.log(this.userInfo.userid);
      http
        .delete(`/user/` + this.userInfo.userid, {
          // userid: this.userInfo.userid,
        })
        .then(({ data }) => {
          if (data === "success") {
            let msg = "탈퇴에 성공하였습니다.";
            alert(msg);
            this.SET_IS_LOGIN(false);
            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>

<style></style>
