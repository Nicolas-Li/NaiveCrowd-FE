<template>
    <el-main v-if="task.id">
        <h1>配置任务</h1>
        <el-form :model="ruleForm" :rules="rules" class="form" label-width="130px" ref="ruleForm">
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
            <el-form-item label="任务标签" prop="taskTag" required>
                <el-tag
                        :disable-transitions="false"
                        :key="tag"
                        @close="handleClose(tag)"
                        closable
                        v-for="tag in ruleForm.taskTag">
                    {{tag}}
                </el-tag>
                <el-input
                        @blur="handleInputConfirm"
                        @keyup.enter.native="handleInputConfirm"
                        class="input-new-tag"
                        ref="saveTagInput"
                        size="small"
                        v-if="inputVisible"
                        v-model="inputValue"
                >
                </el-input>
                <el-button @click="showInput" class="button-new-tag" size="small" v-else>+ 新标签</el-button>
            </el-form-item>
            <el-form-item label="题目模板">
                <el-row>
                    <i :key="type.value" v-for="type in miniTasksTypeOptions">
                        <el-col :span="Math.floor(24 / miniTasksTypeOptions.length)">
                            <a :href="type.value" @click.prevent="downloadTemplate(type.value)">
                                查看{{ type.label }}模板
                            </a>
                        </el-col>
                    </i>
                </el-row>
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
            <el-row>
                <el-col :span="12">
                    <el-form-item label="做题时间" required>
                        <el-row>
                            <el-col :span="12">每个小任务最长做题时间为</el-col>
                            <el-col :span="8">
                                <el-form-item prop="miniTasksTime">
                                    <el-input type="number" v-model="ruleForm.miniTasksTime"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">秒</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重复分配次数" required>
                        <el-col :span="12">每个任务最多被分配</el-col>
                        <el-col :span="8">
                            <el-form-item prop="miniTasksLimit">
                                <el-input type="number" v-model="ruleForm.miniTasksLimit"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">次</el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="题目类型" prop="miniTasksType" required>
                        <el-select placeholder="请选择题目类型" v-model="ruleForm.miniTasksType">
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in miniTasksTypeOptions">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
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
    import src_util from "@/util"
    import task_util from "@/components/task/util"

    export default {
        name: "Configuration",
        data() {
            return {
                task: {
                    title: "任务标题",
                    intro: "任务介绍"
                },
                miniTasksTypeOptions: [
                    {label: "填空题", value: "completion",},
                    {label: "选择题", value: "choice",},
                    {label: "图片判断题", value: "photo-judge",},
                ],
                inputVisible: false,
                inputValue: '',
                ruleForm: {
                    date: null,
                    time: null,
                    problems: null,
                    taskTag: [],
                    miniTasksType: null,
                    miniTasksNum: null,
                    miniTasksBonus1: null,
                    miniTasksBonus2: null,
                    miniTasksTime: null,
                    miniTasksLimit: 2,
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
                    taskTag: [
                        {required: true, message: '请至少输入一个tag', trigger: 'blur'}
                    ],
                    miniTasksType: [
                        {required: true, message: '请选择正确的题目类型', trigger: 'blur'}
                    ],
                    miniTasksNum: [
                        {required: true, message: '请输入小任务大小', trigger: 'blur'}
                    ],
                    miniTasksBonus1: [
                        {required: true, message: '请输入小任务金钱/元', trigger: 'blur'}
                    ],
                    miniTasksBonus2: [
                        {required: true, message: '请输入小任务金钱/分', trigger: 'blur'}
                    ],
                    miniTasksTime: [
                        {required: true, message: '请选择小任务做题时间', trigger: 'change'}
                    ],
                    miniTasksLimit: [
                        {required: true, message: '请选择小任务被做次数', trigger: 'change'}
                    ],
                },
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
                src_util.toIndex(this, "配置出错啦！即将返回主页面")
            }
        },
        methods: {
            handleClose(tag) {
                this.ruleForm.taskTag.splice(this.ruleForm.taskTag.indexOf(tag), 1)
                this.$refs.ruleForm.validateField('taskTag')
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (this.ruleForm.taskTag.indexOf(inputValue) >= 0) {
                    this.$message.warning("tag不能重复")
                }
                else if (inputValue) {
                    this.ruleForm.taskTag.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            beforeProblemsUpload(file) {
                // const isTXTorZIP = (file.type === 'text/plain') || (file.type === 'application/x-zip-compressed')
                // if (!isTXTorZIP) {
                //     this.$message.error('上传配置任务只能是 TXT/ZIP 格式!')
                // } else {
                this.ruleForm.problems = file
                this.$refs.ruleForm.validateField('problems')
                // }
                // return isTXTorZIP
                return true
            },
            handleProblemsRemove() {
                this.ruleForm.problems = null
                this.$refs.ruleForm.validateField('problems')
            },
            downloadTemplate(type) {
                fun.getTemplate(type).then(res => {
                    let data = res.data
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        let url = data.templateUrl
                        //创建a标签
                        let a = document.createElement('a');
                        a.setAttribute('href', url);
                        a.setAttribute('download', type); //分割路径，取出最后一个元素
                        a.setAttribute('target', '_blank');
                        a.setAttribute('id', 'DownloadFile');
                        // 防止反复添加
                        if (document.getElementById('DownloadFile')) {
                            document.body.removeChild(document.getElementById('DownloadFile'));
                        }
                        document.body.appendChild(a);
                        a.click();
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            submitForm(formName) {
                task_util.submitForm(this, formName, true)
            },
            resetForm(formName) {
                task_util.resetForm(this, formName)
            },
        },
        computed: {
            deadline: function () {
                return src_util.deadline(this.ruleForm.time, this.ruleForm.date)
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

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>