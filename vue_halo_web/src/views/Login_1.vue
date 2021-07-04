<template>
  <div>
    <el-container>
      <el-header>
        <img
            class="logo"
            src="https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-icon-a@master/spring.1ra9xtxvcxeo.svg"
            alt="spring"
        />
      </el-header>
      <el-main>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        email: "1379978893@qq.com",
        password: "111111",
      },
      rules: {
        // username: [
        //   {required: true, message: "请输入用户名", trigger: "blur"},
        //   {min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur"},
        // ],
        password: [
          {required: true, message: "请输入密码", trigger: "change"},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
            console.log("登录成功");
            // 跳转页面
            _this.$router.push("/blogs");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.logo {
  height: 100%;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 30px;
}
</style>