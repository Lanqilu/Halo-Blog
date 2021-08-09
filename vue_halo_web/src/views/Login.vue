<template>
  <div class="m-login">
    <div class="container ">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form action="#" class="form" id="form1">
          <h2 class="form__title">注 册</h2>
          <input type="text" placeholder="用户名" class="input"/>
          <input type="email" placeholder="电子邮箱" class="input"/>
          <input type="password" placeholder="密码" class="input"/>
          <button class="btn">注 册</button>
        </form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <form action="#" class="form" id="form2" :model="ruleForm">
          <h2 class="form__title">登 录</h2>
          <input type="email" placeholder="电子邮箱" class="input" v-model="ruleForm.email"/>
          <input type="password" placeholder="密码" class="input" v-model="ruleForm.password"/>
          <!--        <a href="#" class="link">忘记密码?</a>-->
          <button class="btn" @click.prevent="submitForm('ruleForm')">登 录</button>
        </form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn" @click="signInBtn">点击登录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp" @click="signUpBtn">点击注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Login",
  data() {
    return {
      ruleForm: {
        email: "1379978893@qq.com",
        password: "111111",
      },
    }
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$axios.post("/login", this.ruleForm).then((res) => {
        // 获取 JWT
        const jwt = res.headers["authorization"];
        // 获取用户信息
        const userInfo = res.data.data;

        // 赋值到全局store
        _this.$store.commit("SET_TOKEN", jwt);
        _this.$store.commit("SET_USERINFO", userInfo);

        // 登录成功
        // console.log("登录成功+++++++++++++++++++++");
        // 跳转页面
        _this.$router.push("/home");
        // console.log("登录成功----------------------");
      });
    },
    signInBtn() {
      let container = document.querySelector(".container");
      container.classList.remove("right-panel-active");
    },
    signUpBtn() {
      let container = document.querySelector(".container");
      container.classList.add("right-panel-active");
    },
  },
}
</script>

<style scoped>
.m-login {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.8rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  align-items: center;
  background: var(--white) url("https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  font-weight: 500;
  font-size: 2rem;
  margin: 0 0 2rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background: var(--lightblue) url("https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg") no-repeat fixed center;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: var(--button-radius);
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 2rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  border-radius: 0.2rem;
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

.input:focus-visible{
  outline: 0;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>

