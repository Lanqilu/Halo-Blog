<template>
  <div class="halo-user-info">


    <div class="halo-has-login" v-show="hasLogin">
      <div class="halo-user-avatar">
        <el-avatar shape="square" :size="120" :src="user.avatar"></el-avatar>
        <div class="halo-username">{{ user.username }}</div>
      </div>

      <div class="halo-personal-homepage">
        <a href="/blog/add">发表文章</a>
      </div>
      <div class="logout">
        <a @click="logout()">退出</a>
      </div>

    </div>

    <div class="halo-has-not-login" v-show="!hasLogin">
      <div class="login">
        <a href="/login">登 录</a>
      </div>
      <div class="register">
        <a href="/register">注 册</a>
      </div>
    </div>


  </div>
</template>

<script>
import Login from "@/views/discard/Login_1";

export default {
  components: {Login},
  data() {
    return {
      user: {
        username: "Halo",
        avatar:
            "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-icon-a@master/spring.1ra9xtxvcxeo.svg",
      },
      hasLogin: false,
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios
          .get("/logout", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            _this.$store.commit("REMOVE_INFO");
            _this.$router.push("/login");
          });
      console.log("退出");
    },
  },
  created() {

    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;

      this.hasLogin = true;
    }
  },
};
</script>

<style scoped lang="scss">

.halo-user-info {
  padding: 0;
  margin: 0;
  background: #ffffff;
  min-height: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-content: center;


  .halo-has-not-login {
    width: 100%;
    display: flex;
    flex-flow: column;
    margin: 0;
    padding: 15px;

    .login, .register {
      flex: 1 0 auto;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-content: center;
      margin: 10px;
      cursor: pointer;
      font-size: 1.1rem;
      height: 65px;
      font-weight: 600;

      a {
        display: block;
        border-radius: 12px;
        text-align: center;
        width: 100%;
        height: 65px;
        line-height: 60px;
      }
    }

    .login {
      background: rgba(210, 231, 231, 0.99);
    }

    .register {
      background: rgba(230, 219, 232, 0.99);
    }

    .login > a:hover, .register > a:hover {
      background: #93c2e2;
      color: #ffffff;
    }

  }

  .halo-has-login {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    .halo-user-avatar {
      align-self: center;
      padding: 30px 30px 10px 30px;
      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 2;

      .halo-username {
        text-align: center;
        padding: 5px;
        font-size: 1.1rem;
      }

    }


    .halo-personal-homepage, .logout {
      background: rgba(186, 222, 218, 0.64);
      cursor: pointer;

      height: 50px;
      width: 100px;
      border-radius: 12px;
      line-height: 50px;
      text-align: center;

      &:hover {
        background: rgba(186, 196, 222, 0.64);
      }


    }

    .halo-personal-homepage {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 3;

      height: 50px;
      width: 100px;
      border-radius: 12px;
      line-height: 50px;
      text-align: center;

      align-self: end;
      margin-bottom: 20px;
    }

    .logout {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 3;

      align-self: start;
      margin-top: 10px;
    }


    span.el-avatar.el-avatar--square {
      border-radius: 12px;
    }

  }

}


</style>