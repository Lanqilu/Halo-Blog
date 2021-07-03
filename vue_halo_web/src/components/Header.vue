<template>
  <div class="m-content">
    <h3>HALO博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
    </div>
    <div>{{ user.username }}</div>
    <div class="m-maction">
      <span>
        <el-link type="primary" href="/blogs">主页</el-link>
      </span>

      <el-divider direction="vertical"></el-divider>
      <span>
        <el-link type="success" href="/blog/add">发表文章</el-link>
      </span>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin">
        <el-link type="info" href="/login">登录</el-link>
      </span>
      <span v-show="hasLogin">
        <el-link type="warning" @click="logout()">退出</el-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
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

<style>
.m-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.m-maction {
  margin: 10px;
}
</style>