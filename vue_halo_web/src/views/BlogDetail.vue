<template>
  <div class="m-container">
    <Header></Header>

    <div class="halo-blog">

      <div class="m-blog">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.userId }}</p>
        <el-link icon="el-icon-edit" v-if="ownBlog">
          <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link>
        </el-link>
        <el-divider></el-divider>
        <div>
          描述：{{ blog.description }}
        </div>
        <el-divider></el-divider>
        <div class="content markdown-body" v-html="blog.content"></div>
      </div>

      <div class="halo-blog-catalogue"></div>

    </div>

  </div>
</template>
<script>
import "github-markdown-css/github-markdown.css"; // 然后添加样式markdown-body
import Header from "@/components/discard/Header_1";

export default {
  name: "BlogDetail",
  components: {
    Header,
  },
  data() {
    return {
      blog: {
        userId: null,
        title: "",
        description: "",
        content: "",
      },
      ownBlog: false,
    };
  },
  methods: {
    getBlog() {
      const blogId = this.$route.params.blogId;
      const _this = this;
      this.$axios.get("/blog/" + blogId).then((res) => {
        console.log(res);
        console.log(res.data.data);
        _this.blog = res.data.data;
        var MarkdownIt = require("markdown-it"),
            md = new MarkdownIt();
        var result = md.render(_this.blog.content);
        _this.blog.content = result;
        // 判断是否是自己的文章，能否编辑
        _this.ownBlog = _this.blog.userId === _this.$store.getters.getUser.id;
      });
    },
  },
  created() {
    this.getBlog();
  },
};
</script>

<style scoped lang="scss">
.halo-blog {
  margin: 40px auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  .m-blog {
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
    border-radius: 12px;
    width: 65%;
    max-width: 1200px;
    margin-right: 25px;
  }

  .halo-blog-catalogue {
    border-radius: 12px;
    background: #99CCCC;
    width: 20%;
    height: 500px;

  }

}


</style>