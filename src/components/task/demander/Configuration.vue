<template>
    <el-main v-if="task.id">
        <h1>配置任务</h1>
        <el-form :model="ruleForm" :rules="rules" class="form" label-width="100px" ref="ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="任务标题">
                        <el-input disabled v-model="task.title"/>
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
            <el-form-item label="任务介绍">
                <el-input disabled type="textarea" v-model="task.intro"/>
            </el-form-item>
            <el-form-item label="题目模板">
                <el-row>
                    <i :key="template.downUrl" v-for="template in templates">
                        <el-col :span="Math.floor(24 / templates.length)">
                            <a :href="template.downUrl" @click.prevent="downloadTemplate(template.downUrl)">
                                查看{{ template.downName }}模板
                            </a>
                        </el-col>
                    </i>
                </el-row>
            </el-form-item>
            <el-form-item label="上传题目" prop="problems" required>
                <el-upload
                        :before-upload="beforeProblemsUpload"
                        :http-request="() => {null}"
                        :limit="1"
                        :multiple="false"
                        :on-remove="handleProblemsRemove"
                        action="null">
                    <el-button :disabled="uploadAble" size="small" type="success">点击上传<br/>题目文件</el-button>
                    <div class="el-upload__tip" slot="tip">只能上传一个txt/zip文件</div>
                </el-upload>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="小任务大小" required>
                        <el-row>
                            <el-col :span="7">每个任务有</el-col>
                            <el-col :span="12">
                                <el-form-item prop="miniTasksNum">
                                    <el-input type="number" v-model="ruleForm.miniTasksNum"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">道题目</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="小任务奖励" required>
                        <el-col :span="6">每个任务奖励</el-col>
                        <el-col :span="7">
                            <el-form-item prop="miniTasksBonus1">
                                <el-input type="number" v-model="ruleForm.miniTasksBonus1"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">元</el-col>
                        <el-col :span="7">
                            <el-form-item prop="miniTasksBonus2">
                                <el-input type="number" v-model="ruleForm.miniTasksBonus2"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">分</el-col>
                    </el-form-item>
                </el-col>
            </el-row>
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
        name: "Configuration",
        data() {
            return {
                task: {
                    title: "任务标题",
                    intro: "任务介绍"
                },
                ruleForm: {
                    date: null,
                    time: null,
                    problems: null,
                    miniTasksNum: null,
                    miniTasksBonus1: null,
                    miniTasksBonus2: null,
                },
                rules: {
                    date: [
                        {type: 'date', message: '请选择日期', trigger: 'change'}
                    ],
                    time: [
                        {type: 'date', message: '请选择时间', trigger: 'change'}
                    ],
                    problems: [
                        {required: true, message: '请上传正确格式的题目文件', trigger: 'blur'}
                    ],
                    miniTasksNum: [
                        {required: true, message: '请输入小任务大小', trigger: 'blur'}
                    ],
                    miniTasksBonus1: [
                        {required: true, message: '请输入小任务金钱/元', trigger: 'blur'}
                    ],
                    miniTasksBonus2: [
                        {required: true, message: '请输入小任务金钱/分', trigger: 'blur'}
                    ]
                },
                templates: [
                    {
                        downUrl: '2',
                        downName: '选择题'
                    },
                    {
                        downUrl: '1',
                        downName: '填空题'
                    }
                ],
                isSubmitting: false,
            }
        },
        mounted: function () {
            let task = this.$route.params
            if (task.id && Number(task.status) === 0) {
                this.task = task
                let dateTime = new Date()
                dateTime.setTime(Number(task.time))
                this.ruleForm.date = new Date()
                this.ruleForm.date.setFullYear(dateTime.getFullYear())
                this.ruleForm.date.setMonth(dateTime.getMonth())
                this.ruleForm.date.setDate(dateTime.getDate())
                this.ruleForm.time = new Date()
                this.ruleForm.time.setTime(dateTime.getTime())
            } else {
                this.$message.error("配置出错啦！即将返回前一页面")
                setTimeout(() => {
                    this.$router.back()
                }, 1500)
            }
        },
        methods: {
            beforeProblemsUpload(file) {
                const isTXTorZIP = (file.type === 'text/plain') || (file.type === 'application/zip')
                if (!isTXTorZIP) {
                    this.$message.error('上传封面图片只能是 TXT/ZIP 格式!')
                } else {
                    this.ruleForm.problems = file
                    this.$refs.ruleForm.validateField('problems')
                }
                return isTXTorZIP
            },
            handleProblemsRemove() {
                this.ruleForm.problems = null
                this.$refs.ruleForm.validateField('problems')
            },
            downloadTemplate(url) {
                window.open(url)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isSubmitting = true
                        fun.configTask(this.ruleForm.problems, this.task.id, this.deadline, this.ruleForm.miniTasksNum, this.miniTasksBonus)
                            .then(res => {
                                this.isSubmitting = false
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务配置成功")
                                    this.$router.push({path: '/main/task/demander'})
                                }
                            }).catch(err => {
                            this.isSubmitting = false
                            this.$message.error(err.toString())
                            return false
                        })
                    } else {
                        this.$message.error("请完整配置任务！")
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
            miniTasksBonus() {
                return this.ruleForm.miniTasksBonus1 * 100 + this.ruleForm.miniTasksBonus2
            },
            showButton() {
                return this.isSubmitting ? "正在配置" : "立即配置"
            },
            uploadAble() {
                return Boolean(this.ruleForm.problems)
            },
        }
    }
</script>

<style scoped>
    .form {
        padding-right: 100px;
    }
</style>