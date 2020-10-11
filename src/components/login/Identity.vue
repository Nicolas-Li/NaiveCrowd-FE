<template>
    <div class="container">
        <el-card class="card-out">
            <el-card class="card-in">
                <h1 class="title">
                    选择身份
                </h1>
                <template v-for="identity in identities">
                    <router-link :to="identity.url" :key="identity.name" @click.native="setIdentityInCookie(identity.name_en)">
                        <el-card class="identity" shadow="hover">
                            <el-row>
                                <el-col :span="10">
                                    <el-avatar :size="60" class="avatar">{{ identity.avatar }}</el-avatar>
                                </el-col>
                                <el-col :span="14" class="content-right">
                                    <span class="name">{{ identity.name }}</span><br/>
                                    <span class="description">{{ identity.description }}</span></el-col>
                            </el-row>
                        </el-card>
                    </router-link>
                </template>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Identity",
        data() {
            return {
                identities: [
                    {
                        url: "/login/user",
                        avatar: "user",
                        name: "用户",
                        name_en: "user",
                        description: "可以领取任务,完成任务获得回报",
                    },
                    {
                        url: "/login/demander",
                        avatar: "demander",
                        name: "需求方",
                        name_en: "demander",
                        description: "可以创建任务，发布任务，验收任务",
                    }
                ]
            }
        },
        methods: {
            setIdentityInCookie: function (identity) {
                this.$cookies.set("identity", identity, "30d", "/")
            }
        }
    }
</script>

<style scoped>

    .container {
        position: relative;
        max-width: 460px;
        width: 100%;
        margin: 0 auto 100px;
    }

    .card-in {
        margin: -20px 10px -20px 10px;
    }

    .title {
        left: 0;
        opacity: 1;
        visibility: visible;
        transition: .3s ease;
    }

    .identity {
        margin-top: 20px;
    }

    .content-right {
        text-align: left;
    }

    .name {
        font-size: xx-large;
    }

    .description {
        font-size: x-small;
        font-weight: lighter;
    }

</style>