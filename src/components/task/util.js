import fun from "@/net/task";

function f(that, isConfig) {
    return isConfig ? fun.configTask(that.ruleForm.problems, that.task.id, that.deadline, that.ruleForm.taskTag, that.ruleForm.miniTasksNum, that.miniTasksBonus, that.ruleForm.miniTasksTime, that.ruleForm.miniTasksLimit, that.ruleForm.miniTasksType) : fun.createTask(this.ruleForm.cover, this.ruleForm.title, this.ruleForm.intro, this.deadline)
}

export default {
    getTaskProgress(that) {
        fun.getTaskProgress(that.task.id)
            .then(res => {
                let data = res.data
                that.loading = false
                if (data.type === "failed") {
                    that.$message.error(data.message)
                } else if (data.type === "success") {
                    that.percentage = Math.round(Math.min(data.answersNum * 100.0 / data.totalNum, 100))
                }
            }).catch(err => {
            that.loading = false
            that.$message.error(err.toString())
        })
    },
    showStatus(status) {
        let statusList = ["未配置", "待发布", "发布中", "待验收", "待结算", "任务结束"]
        return statusList[status]
    },
    showDate(that) {
        let t = new Date()
        t.setTime(that.task.time)
        return t.toLocaleString()
    },
    resetForm(that, formName) {
        that.$refs[formName].resetFields()
    },
    submitForm(that, formName, isConfig) {
        that.$refs[formName].validate((valid) => {
            if (valid) {
                that.isSubmitting = true
                f(isConfig)
                    .then(res => {
                        that.isSubmitting = false
                        let data = res.data
                        if (data.type === "failed") {
                            that.$message.error(data.message)
                        } else if (data.type === "success") {
                            that.$message.success(isConfig ? "任务配置成功" : "任务创建成功")
                            that.$router.push({path: '/main/task/demander'})
                        }
                    }).catch(err => {
                    that.isSubmitting = false
                    that.$message.error(err.toString())
                    return false
                })
            } else {
                that.$message.error(isConfig ? "请完整配置任务！" : "必须配置任务标题、介绍和封面！")
                return false;
            }
        })
    }
}