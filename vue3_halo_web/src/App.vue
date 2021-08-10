<template>
  <div id="app">
    <!--        <Home/>-->
<!--    <SetUpTest></SetUpTest>-->

<!--    <MarkdownEditorTest></MarkdownEditorTest>-->
        <router-view/>
    <!--    <UserInfo></UserInfo>-->
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Test from "./views/Test.vue";
import UserInfo from "./components/Cards/UserInfo.vue";
import MarkdownEditorTest from "./views/Test/MarkdownEditorTest.vue";
import SetUpTest from "./views/Test/SetUpTest.vue";

export default {
  components: {Home, Test, UserInfo,MarkdownEditorTest,SetUpTest},
  setup() {


  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a, a:link, a:visited, a:hover, a:active {
  text-decoration: none;
  color: inherit;
}

#app {
  background: linear-gradient(90deg, rgba(247, 149, 51, .1),
  rgba(243, 112, 85, .1) 15%, rgba(239, 78, 123, .1) 30%,
  rgba(161, 102, 171, .1) 44%, rgba(80, 115, 184, .1) 58%,
  rgba(16, 152, 173, .1) 72%, rgba(7, 179, 155, .1) 86%,
  rgba(109, 186, 130, .1));
}
</style>
