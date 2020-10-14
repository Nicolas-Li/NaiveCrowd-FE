<template>
    <el-main>
        <h1>创建新任务</h1>
        <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="任务标题" prop="title">
                        <el-input placeholder="例如：人工智能小视频剪辑" v-model="ruleForm.title"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="截止时间">
                        <el-col :span="11">
                            <el-form-item prop="date">
                                <el-date-picker placeholder="选择日期" style="width: 100%;" type="date"
                                                v-model="ruleForm.date"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date">
                                <el-time-picker placeholder="选择时间" style="width: 100%;"
                                                v-model="ruleForm.time"/>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="任务介绍" prop="intro">
                <el-input :autosize="{ minRows: 5 }" maxlength="140"
                          placeholder="不超过140个字"
                          show-word-limit type="textarea" v-model="ruleForm.intro"/>
            </el-form-item>
            <el-form-item label="上传封面图片">
                <el-upload
                        :before-upload="beforeCoverUpload"
                        :http-request="getFile"
                        :limit="1"
                        :multiple="false"
                        action="null"
                        list-type="picture">
                    <el-button size="small" type="success">点击上传任务封面</el-button>
                    <div class="el-upload__tip" slot="tip">只能上传一个jpg/png文件，且不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('ruleForm')" type="primary">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
    import fun from "@/net/task"

    export default {
        data() {
            return {
                cover: "",
                ruleForm: {
                    title: null,
                    intro: null,
                    date: null,
                    time: null
                },
                rules: {
                    title: [
                        {required: true, message: '请输入任务名称', trigger: 'blur'}
                    ],
                    intro: [
                        {required: true, message: '请输入预算', trigger: 'blur'}
                    ],
                    date: [
                        {type: 'date', message: '请选择日期', trigger: 'change'}
                    ],
                    time: [
                        {type: 'date', message: '请选择时间', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写任务描述', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            beforeCoverUpload(file) {
                const isPIC = (file.type === 'image/jpeg') || (file.type === 'image/png')
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isPIC) {
                    this.$message.error('上传封面图片只能是 JPG/PNG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传封面图片大小不能超过 2MB!')
                }
                return isPIC && isLt2M
            },
            getFile(e) {
                this.cover = e.file
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fun.createTask(this.cover, this.ruleForm.title, this.ruleForm.intro, this.deadline)
                            .then(res => {
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务创建成功")
                                    this.$router.push({ path: '/main/task/demander' })
                                }
                            }).catch(err => {
                            this.$message.error(err.toString())
                            return false
                        })
                    } else {
                        this.$message.error("任务标题和介绍必须填写！")
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        computed: {
            deadline: function () {
                let deadline = new Date()
                if (this.ruleForm.time && this.ruleForm.date) {
                    deadline.setTime(this.ruleForm.time.getTime())
                    deadline.setDate(this.ruleForm.date.getDate())
                    deadline.setMonth(this.ruleForm.date.getMonth())
                    deadline.setFullYear(this.ruleForm.date.getFullYear())
                } else {
                    deadline.setFullYear(deadline.getFullYear() + 1)
                }
                return deadline.getTime()
            }
        }
    }
</script>

<style scoped>
</style>