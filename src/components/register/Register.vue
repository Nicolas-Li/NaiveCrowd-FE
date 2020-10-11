<template>
    <div class="container">
        <el-card class="card-out">
            <el-card class="card-in">
                <h1 class="title">
                    注册
                </h1>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" autocomplete="on"/>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" autocomplete="on"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="on"/>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import fun from "@/net/login"

    export default {
        name: "Register",
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择邮箱'));
                } else {
                    callback();
                }
            };
            let validateSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择性别'));
                } else {
                    callback();
                }
            };
            return {
                sexOptions: [
                    {
                        label: "男",
                        value: "male"
                    },
                    {
                        label: "女",
                        value: "female"
                    },
                    {
                        label: "非二元性别",
                        value: "non-binary"
                    },
                ],
                ruleForm: {
                    name: '',
                    pass: '',
                    checkPass: '',
                    email: '',
                    sex: ''
                },
                rules: {
                    name: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    sex: [
                        {validator: validateSex, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$cookies.set("name", this.ruleForm.name, "30d", "/")
                        fun.register(this.ruleForm.pass, this.ruleForm.email, this.ruleForm.sex)
                            .then(res => {
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("注册成功")
                                    this.$cookies.set("isLogin", true, "30d", "/")
                                    this.$router.push({ path: '/main' })
                                }
                            }).catch(err => {
                            this.$message.error(err.toString())
                        })
                    } else {
                        this.$message.error('提交信息不正确！');
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

    .container {
        position: relative;
        max-width: 460px;
        width: 100%;
        margin: 0 auto 100px;
    }

    .card-in {
        margin: -20px 10px -20px 10px;
    }

    .title {
        left: 0;
        opacity: 1;
        visibility: visible;
        transition: .3s ease;
    }

</style>