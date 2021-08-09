<template>
  <div class="m-container">
    <Header></Header>

    <div class="halo-blog">
      <div class="m-blog">
        <div class="halo-blog-title">
          <h1>{{ blog.title }}</h1>
          <el-link icon="el-icon-edit" v-if="ownBlog">
            <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link>
          </el-link>
          <span>{{ blog.userId }}</span>
        </div>

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
import Header from "../components/Headers/DefaultHeader.vue";
// import MarkdownIt from "markdown-it";

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
      msg: "hello",
      ownBlog: false,
    };
  },

  methods: {


    getBlog() {
      const blogId = this.$route.params.blogId;
      this.$axios.get("/blog/" + blogId).then((res) => {
        this.blog = {...this.blog, ...res.data.data};
        const MarkdownIt = require("markdown-it"), md = new MarkdownIt();
        this.blog.content = md.render(this.blog.content);
        // 判断是否是自己的文章，能否编辑
        this.ownBlog = this.blog.userId === this.$store.getters.getUser.id;
      });

      // this.$axios.post("/user/userId/"+userId).then((res)=>{
      //   this.user = res.data.data
      //   console.log(this.user)
      // })

    },

    // 获取作者信息
    getAuthorInfo() {
      // this.$axios.post("/user/userId/"+this.blog.userId).then((res)=>{
      //   this.user = res.data.data
      //   console.log(this.user)
      // })
    },
  },

  computed(){


  },

  created() {
    // this.getBlog();
    const blogId = this.$route.params.blogId;
    this.$axios.get("/blog/" + blogId).then((res) => {
      this.blog = {...this.blog, ...res.data.data};
      const MarkdownIt = require("markdown-it"), md = new MarkdownIt();
      this.blog.content = md.render(this.blog.content);
      // 判断是否是自己的文章，能否编辑
      this.ownBlog = this.blog.userId === this.$store.getters.getUser.id;
    });

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