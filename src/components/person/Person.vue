<template>
    <el-container>
        <el-aside>
            <el-menu :default-openeds="['1', '2', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-info"></i>账户资料</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">资料编辑</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu v-if="identity === 'user'" index="2">
                    <template slot="title"><i class="el-icon-grape"></i>我的众包</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">历史任务</el-menu-item>
                        <el-menu-item index="2-2">未完成任务</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu v-if="identity === 'demander'" index="3">
                    <template slot="title"><i class="el-icon-cherry"></i>我的众包</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">我的发布</el-menu-item>
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
        data() {
            return {
                identity: this.$cookies.get("identity")
            }
        }
    }
</script>

<style scoped>

</style>