import fun from "@/net/login";

function f(that, isRegister) {
    return (isRegister ? fun.register(that.ruleForm.pass, that.ruleForm.email, that.ruleForm.sex) : fun.login(that.ruleForm.pass))
}

export default {
    submitForm(that, formName, isRegister) {
        that.$refs[formName].validate((valid) => {
            if (valid && (isRegister || that.$cookies.isKey("identity"))) {
                that.$cookies.set("name", that.ruleForm.name, "30d", "/")
                f(that, isRegister)
                    .then(res => {
                        let data = res.data
                        if (data.type === "failed") {
                            that.$message.error(data.message)
                        } else if (data.type === "success") {
                            that.$message.success(isRegister ? "注册成功" : "登录成功")
                            that.$cookies.set("isLogin", true, "30d", "/")
                            that.$router.push({path: '/main'})
                        }
                    }).catch(err => {
                    that.$message.error(err.toString())
                })
            } else {
                that.$message.error('提交信息不正确！')
                return false;
            }
        })
    },
    resetForm(that, formName) {
        that.$refs[formName].resetFields()
    }
}