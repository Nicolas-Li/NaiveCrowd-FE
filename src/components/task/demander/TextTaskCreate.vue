<template>
<el-container>
        <el-header>
            <el-row>
                <el-col :span="20">
                    <el-menu class="grid-content bg-purple menu-left" router mode="horizontal">
                        <el-menu-item index="/taskcreate">任务创建</el-menu-item>
                        <el-menu-item index="/acceptance">验收</el-menu-item>
                        <el-menu-item index="/settlement">结算</el-menu-item>
                        <el-menu-item index="/export">导出</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4">
                    <el-menu class="grid-content bg-purple-light menu-right" router mode="horizontal">
                        <el-menu-item index="/login">登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-container>
                <el-header>
                    文本任务创建
                </el-header>
                <el-main>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="任务名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="预算" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="截止时间" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>
                            <el-form-item label="任务描述" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">请上传txt文件</div>
                        </el-upload>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                        </el-form>
                </el-main>
                <el-footer>

                </el-footer>
            </el-container>
        </el-main>
        <el-footer></el-footer>
    </el-container>
    
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          price: '',
          date1: '',
          date2: '',
          delivery: false,
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入预算', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写任务描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .menu-left {
        padding-left: 50px;
    }

    .menu-right {
        padding-left: 50px;
        padding-right: 50px;
    }
</style>