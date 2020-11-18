<template>
    <el-card>
        <el-image style="height: 200px; min-width: 800px" fit="cover"
                  src="http://wx4.sinaimg.cn/mw690/006HO9i9ly1gjj1pdv2itj328n1hre81.jpg"/>
        <el-row>
            <el-col :span="2"><br/></el-col>
            <el-col :span="4" style="text-align: left">
                <el-row class="name">{{ name }}<i :class="sex"/></el-row>
                <el-row>{{ email }}</el-row>
            </el-col>
            <el-col :span="10"><br/></el-col>
            <el-col :span="4">
                <el-row class="money-value">{{ money }}</el-row>
                <el-row class="credit-label"><i class="el-icon-money"/>钱包/元</el-row>
            </el-col>
            <el-col :span="4">
                <el-row class="credit-value">{{ credit }}</el-row>
                <el-row class="credit-label"><i class="el-icon-magic-stick"/>信誉值</el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-row>
                    <el-button type="danger" round @click.native="dialogVisible = true">注销账号</el-button>
                </el-row>
            </el-col>
            <el-col :span="14"><br/></el-col>
            <el-col :span="4">
                <el-row>
                    <el-button type="info" round @click="logOut">退出登录</el-button>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog
                title="账号删除不可恢复！"
                :visible.sync="dialogVisible"
                :show-close=false
                :close-on-click-modal="false"
                width="30%">
            <el-input placeholder="请验证密码" type="password" v-model="password" show-password/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelLogDel">取 消</el-button>
                <el-button type="primary" @click="confirmLogDel">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
    import fun from "@/net/info"
    import util from "@/util"

    export default {
        name: "detail",
        data() {
            return {
                name: "unknown",
                email: "unknown",
                sex: "unknown",
                credit: 100,
                money: 0,
                dialogVisible: false,
                password: null
            }
        },
        mounted: function () {
            this.getInfo()
        },
        methods: {
            getInfo: function () {
                fun.getInfo()
                    .then(res => {
                        let data = res.data
                        if (data.type === "failed") {
                            this.$message.error(data.message)
                        } else if (data.type === "success") {
                            this.name = this.$cookies.get('name')
                            this.sex = data.sex === "non-binary" ? "el-icon-link" : "el-icon-" + data.sex
                            this.email = data.email
                            this.credit = data.credit ? data.credit : 100
                            this.money = util.money(data.money ? data.money : 0).replace("元", "")
                        }
                    }).catch(err => {
                        this.$message.error(err.toString())
                })
            },
            retMain: function () {
                this.$cookies.set("isLogin", false)
                this.$cookies.remove("identity")
                this.$cookies.remove("name")
                this.$router.push('/')
            },
            logOut: function () {
                this.retMain()
            },
            cancelLogDel: function () {
                this.password = null
                this.dialogVisible = false
            },
            confirmLogDel: function () {
                fun.logDel(this.password)
                    .then(res => {
                        let data = res.data
                        if (data.type === "failed") {
                            this.$message.error(data.message)
                        } else if (data.type === "success") {
                            this.$message.success("注销成功")
                            this.logOut()
                        }
                    }).catch(err => {
                        this.$message.error(err.toString())
                })
                this.password = null
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>
    .name {
        font-weight: bold;
        font-size: x-large;
    }

    .el-icon-male {
        color: blue;
    }

    .el-icon-female {
        color: red;
    }

    .credit-value {
        color: #9c0bdb;
        font-weight: bolder;
        font-size: xx-large;
    }
    .money-value {
        color: #8d6900;
        font-weight: bolder;
        font-size: xx-large;
    }

    .credit-label {
        font-size: small;
    }
</style>