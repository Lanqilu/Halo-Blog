<template>
  <div>
    <Header></Header>

    <div class="halo-body">
      <div class="halo-left-content">
        <!-- 幻灯片 -->
        <div class="halo-carousel">
          <el-carousel height="300px" interval="3500">
            <el-carousel-item v-for="item in 4" :key="item">

            </el-carousel-item>
          </el-carousel>
        </div>
        <!--文章-->
        <div class="halo-blogs-box">
          <div
              v-for="item in blogs"
              :key="item.blogId"
              class="blogs"
          >
            <div class="halo-blog-img">
              <img class="post_bg"
                   src="https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-c@master/wallhaven-g8reee.4ts0wc1e2740.png"
                   alt="图">
            </div>
            <div class="halo-blog-content">
              <h3 class="halo-blog-title">
                <router-link :to="{name: 'BlogDetail', params: {blogId: item.id}}">{{ item.title }}</router-link>
              </h3>
              <p class="halo-blog-text">{{ item.description }}</p>
              <p class="halo-blog-created">{{ item.created }}</p>
            </div>

          </div>
        </div>
        <!--分页-->
        <el-pagination class="halo-pagination"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="page"
        ></el-pagination>
      </div>

      <div class="halo-right-content">
        <div class="halo-card">
          <div class="userInfo"></div>
          <div class="inform"></div>
          <div class="inform"></div>
          <div class="inform"></div>
          <div class="inform"></div>
        </div>
      </div>
    </div>


    <Footer></Footer>

  </div>

</template>

<script>
import Header from "../components/Header.vue";
import Footer from "@/components/Footer";
import Swiper from "@/components/MySwiper";

export default {
  name: "Blog.vue",
  components: {Footer, Header, Swiper},
  data() {
    return {
      currentDate: new Date(),
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 3,
    };
  },
  methods: {
    page(currentPage) {
      const _this = this;
      this.$axios.get("/blogs?currentPage=" + currentPage).then((res) => {
        console.log(res.data.data.records);
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
  },
  created() {
    this.page(1);
  },
};
</script>

<style lang="scss">

.halo-body {
  margin: 0 auto;
  padding: 1.5rem 1rem;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 69% 29%;
  grid-gap: 2%;



  .halo-left-content{

    .halo-blogs-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;

      // 测试样式
      //border: solid 2px greenyellow;

      .blogs {
        margin-top: 20px;
        border-radius: 12px;
        box-shadow: 0 3px 8px 6px rgba(7,17,27,0.06);
        background: rgba(255, 255, 255, 0.9);

        .halo-blog-content {
          .halo-blog-title {
            font-weight: 700;
            line-height: 1.6;
            font-size: 1.4rem;
          }

          display: flex;
          margin: 0 auto;
          flex-direction: column;
          justify-content: center;
          align-content: center;
        }

        min-height: 100px;
        display: flex;
        overflow: hidden;

        // 测试样式
        //border: solid 2px #ED5565;

        .halo-blog-img {
          padding: 0;
          margin: 0;

          img {
            width: 350px;
            height: 100%;
            padding: 0;
            margin: 0;
          }
        }
      }
    }

    .halo-pagination {
      text-align: center;
      margin-top: 20px;
    }

    .halo-carousel{
      .el-carousel__container {
        border-radius: 12px;
        overflow: hidden;

        button{
          border-radius: 12px;
        }

        // 测试样式
        //border: solid;
      }

      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        border-radius: 12px;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        overflow: hidden;
      }

      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
        overflow: hidden;
      }

    }
  }

  .halo-right-content{
    .halo-card {
      top: 20px;
      position: sticky;
      div {
        height: 200px;
        width: auto;
        background: #26384E;
        margin-top: 20px;
        border-radius: 10px;
      }

      div:first-child {
        margin-top: 0;
      }
    }
  }



}






</style>