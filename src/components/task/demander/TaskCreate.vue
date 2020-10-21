<template>
    <el-main>
        <h1>创建新任务</h1>
        <el-form :model="ruleForm" :rules="rules" class="form" label-width="100px" ref="ruleForm">
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
                            <el-form-item prop="time">
                                <el-time-picker placeholder="选择时间" style="width: 100%;"
                                                v-model="ruleForm.time"/>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="任务介绍" prop="intro">
                <el-input :autosize="{ minRows: 5 }" maxlength="140" placeholder="不超过140个字"
                          show-word-limit type="textarea" v-model="ruleForm.intro"/>
            </el-form-item>
            <el-form-item label="上传封面" prop="cover" required>
                <el-upload
                        :before-upload="beforeCoverUpload"
                        :http-request="() => {null}"
                        :limit="1"
                        :multiple="false"
                        :on-remove="handleCoverRemove"
                        action="null"
                        list-type="picture-card">
                    <el-button :disabled="uploadAble" size="small" type="success">点击上传<br/>任务封面</el-button>
                    <div class="el-upload__tip" slot="tip">只能上传一个jpg/png文件，且不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button :loading="isSubmitting" @click="submitForm('ruleForm')" type="primary">
                    {{ showButton }}
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
    import fun from "@/net/task"

    export default {
        name: "TaskCreate",
        data() {
            return {
                ruleForm: {
                    title: null,
                    intro: null,
                    date: null,
                    time: null,
                    cover: null,
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
                    cover: [
                        {required: true, message: '请上传封面', trigger: 'blur'}
                    ]
                },
                isSubmitting: false,
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
                if (isPIC && isLt2M) {
                    this.ruleForm.cover = file
                    this.$refs.ruleForm.validateField('cover')
                }
                return isPIC && isLt2M
            },
            handleCoverRemove() {
                this.ruleForm.cover = null
                this.$refs.ruleForm.validateField('cover')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isSubmitting = true
                        fun.createTask(this.ruleForm.cover, this.ruleForm.title, this.ruleForm.intro, this.deadline)
                            .then(res => {
                                this.isSubmitting = false
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务创建成功")
                                    this.$router.push({path: '/main/task/demander'})
                                }
                            }).catch(err => {
                            this.isSubmitting = false
                            this.$message.error(err.toString())
                            return false
                        })
                    } else {
                        this.$message.error("必须配置任务标题、介绍和封面！")
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
            },
            showButton() {
                return this.isSubmitting ? "正在创建" : "立即创建"
            },
            uploadAble() {
                return Boolean(this.ruleForm.cover)
            },
        }
    }
</script>

<style scoped>
    .form {
        padding-right: 100px;
    }
</style>