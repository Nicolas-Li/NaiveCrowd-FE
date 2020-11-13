export default {
    deadline(time, date) {
        let deadline = new Date()
        if (time && date) {
            deadline.setTime(time.getTime())
            deadline.setDate(date.getDate())
            deadline.setMonth(date.getMonth())
            deadline.setFullYear(date.getFullYear())
        } else {
            deadline.setFullYear(deadline.getFullYear() + 1)
        }
        return deadline.getTime()
    },
    money(m) {
        return m / 100.0 + "元"
    },
    toIndex(that, text) {
        that.$message.warning(text)
        setTimeout(() => {
            that.$router.push({name: 'index'})
        }, 1500)
    }
}