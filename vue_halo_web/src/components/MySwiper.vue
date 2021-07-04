<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="swiper-container">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  swiperOptions: {
    slidesPerView: 4,//显示个数
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination'
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  }
};
</script>

<style scoped>

.swiper-container {
  width: 50%;
  height: 50%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #99CCCC;
  height: 200px;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>