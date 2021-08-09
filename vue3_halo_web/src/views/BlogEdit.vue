<template>
  <div>
    <!--    <Header></Header>-->
    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="description">
          <el-input type="textarea" v-model="editForm.blogCover"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <textarea v-model="editForm.content"/>
        </el-form-item>
        <el-form-item label="状态" prop="content">
          <textarea v-model="editForm.status"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(editForm)">完成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import {toRaw} from "vue";
import {BlogDetail} from "../api";
import {useRoute} from "vue-router";
import axios from "axios";

export default {
  name: "BlogEdit",
  data() {
    return {
      editForm: {
        id: null,
        title: "",
        description: "",
        blogCover: "",
        content: "",
        status: null
      },
      rules: {
        title: [
          {required: true, message: "请输入标题", trigger: "blur"},
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        description: [
          {required: true, message: "请输入摘要", trigger: "blur"},
        ],
      },
    };
  },

  async mounted() {
    const route = useRoute()
    let blogId = route.params.blogId;
    let res = await BlogDetail(blogId)
    const blog = res.data.data;
    this.editForm.id = blog.id;
    this.editForm.title = blog.title;
    this.editForm.blogCover = blog.blogCover;
    this.editForm.description = blog.description;
    this.editForm.content = blog.content;
    this.editForm.status = blog.status;
  },


  methods: {
    submitForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          axios
              .post("http://localhost:8088/blog/edit", toRaw(this.editForm), {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              })
              .then(() => {
                this.$alert("操作成功", "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.push("/home");
                  },
                });
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }

}
</script>

<style scoped>

</style>