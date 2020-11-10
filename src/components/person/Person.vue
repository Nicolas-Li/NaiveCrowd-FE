<template>
    <el-container>
        <el-aside>
            <el-menu default-active="/person/detail" :default-openeds="['4', '5']" :router="true">
                <el-menu-item index="/person/detail">
                    <i class="el-icon-info"></i>
                    <span slot="title">账户资料</span>
                </el-menu-item>
                <el-menu-item index="/person">
                    <i class="el-icon-info"></i>
                    <span slot="title">资料编辑</span>
                </el-menu-item>
                <el-menu-item v-if="$cookies.get('identity') === 'demander'" index="/person/charge">
                    <i class="el-icon-info"></i>
                    <span slot="title">充值钱包</span>
                </el-menu-item>
                <el-submenu v-if="identity === 'user'" index="4">
                    <template slot="title"><i class="el-icon-grape"></i>我的众包</template>
                    <el-menu-item-group>
                        <el-menu-item index="/person">历史任务</el-menu-item>
                        <el-menu-item index="/person">未完成任务</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu v-if="identity === 'demander'" index="5">
                    <template slot="title"><i class="el-icon-cherry"></i>我的众包</template>
                    <el-menu-item-group>
                        <el-menu-item index="/person">我的发布</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <router-view/>
    </el-container>
</template>

<script>
    export default {
        name: "Info",
        mounted: function () {
            this.$router.push('/person/detail')
        },
        data() {
            return {
                identity: this.$cookies.get("identity")
            }
        }
    }
</script>

<style scoped>

</style>