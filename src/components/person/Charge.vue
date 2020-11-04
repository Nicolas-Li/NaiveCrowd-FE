<template>

    <el-card>
        <el-image fit="cover"
                  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2414593128,3646382791&fm=26&gp=0.jpg"
                  style="height: 200px"/>
        <el-row><br/></el-row>
        <el-row><br/></el-row>
        <el-row><br/></el-row>
        <el-row>
            <el-col :span="5"><br/></el-col>
            <el-col :span="14">
                <el-input suffix-icon="el-icon-money" v-model="money" type="number">
                    <template slot="prepend">请输入充值金额</template>
                    <template slot="append">
                        <el-button :loading="loading" @click="charge">我要充值</el-button>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="5"><br/></el-col>
        </el-row>
        <el-row><br/></el-row>
        <el-row><br/></el-row>
        <el-row><br/></el-row>
    </el-card>
</template>

<script>
    import fun from "@/net/info"
    export default {
        name: "Charge",
        data() {
            return {
                loading: false,
                money: 0,
            }
        },
        methods: {
            charge: function () {
                if (this.money > 0) {
                    this.loading = true
                    fun.charge(this.money * 100)
                        .then(res => {
                            this.loading = false
                            let data = res.data
                            if (data.type === "success") {
                                this.$message.success("充值成功")
                            } else if (data.type === "failed") {
                                this.$message.error(data.message)
                            }
                        }).catch(err => {
                        this.loading = false
                        this.$message.error(err.toString())
                    })
                }
            }
        },
    }
</script>

<style scoped>
</style>