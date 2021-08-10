<template>
  <div class="m-container">
    <!--    <Header></Header>-->

    <div class="halo-blog">
      <div class="m-blog">
        <div class="halo-blog-title">

          <h1>{{ blog.info.title }}</h1>

          <el-link icon="el-icon-edit" v-if="blog.isOwnBlog">
            <router-link :to="{name: 'BlogEdit', params: {blogId: blog.info.id}}">编辑</router-link>
          </el-link>

          <div class="author-info">
            <img :src="blog.author.avatar" alt="">
            <span>{{ blog.author.username }}</span>
          </div>

        </div>

        <el-divider></el-divider>

        <div>
          描述：{{ blog.info.description }}
        </div>
        <el-divider></el-divider>
        <div class="content markdown-body" v-html="blog.info.content"></div>
        <el-divider></el-divider>


        <div class="like" @click.once="giveLike()">点赞数：{{ blog.info.blogLike }}</div>
      </div>

      <div class="halo-blog-catalogue"></div>

    </div>

  </div>
</template>
<script>
import "github-markdown-css/github-markdown.css";
import {onMounted, onUpdated, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import marked from 'marked'
import {BlogDetail, getAuthorInfo} from "../api";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "BlogDetail",

  setup() {

    const route = useRoute()
    const store = useStore()

    let blog = reactive({
      info: {
        userId: null,
        title: "",
        description: "",
        content: "",
        blogLike: null
      },
      isOwnBlog: false,
      author: {
        avatar: "",
        username: "默认名称"
      },
    })

    const blogId = route.params.blogId;
    onMounted(async () => {


      let blogDetailRes = await BlogDetail(blogId);
      blog.info = {...blog.info, ...blogDetailRes.data.data};
      blog.info.content = marked(blog.info.content);

      console.log(blog);

      // 判断是否是自己的文章，能否编辑
      blog.isOwnBlog = blog.info.userId === store.getters.getUser.id;

      let authorInfoRes = await getAuthorInfo(blog.info.userId)
      blog.author = authorInfoRes.data.data
    })

    function giveLike() {
      axios.post(`http://localhost:8088/blog/like/${blogId}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          ElMessage.success({
            message: res.data.msg,
            type: 'success'
          })
          blog.info.blogLike = res.data.data
        } else {
          ElMessage(res.data.msg);
        }
      })
    }


    return {
      blog,
      giveLike
    }
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

    .author-info {
      img {
        max-height: 3rem;
      }
    }

    .like {
      cursor: pointer;
    }
  }

  .halo-blog-catalogue {
    border-radius: 12px;
    background: #99CCCC;
    width: 20%;
    height: 500px;

  }

}


</style>