import fun from "@/net/task";

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
    showDate() {
        let t = new Date()
        t.setTime(this.task.time)
        return t.toLocaleString()
    },
}