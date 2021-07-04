<template>
  <div class="m-header">

    <div class="nav-link">

      <ul class="nav-link-ul">
        <li class="nav-link-item">
          <a href="/blogs">HALO</a>
        </li>
        <li class="nav-link-item">
          <a href="/blog/add">发表文章</a>
        </li>
        <li class="nav-link-item">
          <a href="/blog/add">归档</a>
        </li>
        <li class="nav-link-item">
          <a href="/blog/add">标签</a>
        </li>
        <li class="nav-link-item">
          <a href="/blog/add">友情链接</a>
        </li>
      </ul>
    </div>

    <div class="nav-search-box">
      <label class="SearchBar-input Input-wrapper Input-wrapper--grey">
        <input type="text" value="">

        <button aria-label="搜索" type="button" class="Button SearchBar-searchButton Button--primary">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>

      </label>
      <div class="search-box">

      </div>
    </div>

    <div class="nav-user-center">
      <div class="user-avatar" v-show="hasLogin">
        <el-avatar :size="30" :src="user.avatar"></el-avatar>
      </div>
      <div>{{ user.username }}</div>
    </div>

    <div v-show="!hasLogin">
      <a href="/login">登录</a>
    </div>

    <div v-show="hasLogin">
      <a @click="logout()">退出</a>
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


.m-header {
  box-sizing: border-box;
  padding: 10px 24px;
  line-height: 30px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  color: #f5f5f7;
}

.nav-user-center {
  display: flex;
  justify-content: center;
  align-content: center;

  .user-avatar {
    span {
      display: flex;
      justify-content: center;
      align-content: center;
    }

    padding-right: 10px;
  }
}

.nav-link {
  display: flex;
  justify-content: center;
  align-content: center;

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  .nav-link-ul {
    height: 36px;
    display: flex;
    align-items: center;

    .nav-link-item {
      margin-right: 12px;
    }
  }

  div {
    margin-right: 20px;
  }
}


</style>