<template>
<el-container>
        <el-header>
            <el-row>
                <el-col :span="20">
                    <el-menu class="grid-content bg-purple menu-left" router mode="horizontal">
                        <el-menu-item index="/taskcreate">任务创建</el-menu-item>
                        <el-menu-item index="/acceptance">验收</el-menu-item>
                        <el-menu-item index="/settlement">结算</el-menu-item>
                        <el-menu-item index="/export">导出</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4">
                    <el-menu class="grid-content bg-purple-light menu-right" router mode="horizontal">
                        <el-menu-item index="/login">登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-container>
                <el-header>
                    验收
                </el-header>
                <el-main>
                    <el-row>
                        <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                            <div style="padding: 14px;">
                                <span>任务test</span>
                                <div class="bottom clearfix">
                                <div>已完成100%</div>
                                <el-button type="text" class="button">开始验收</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-main>
        <el-footer></el-footer>
    </el-container>
    
</template>

<script>
    export default {
        name: "Acceptance",
        data() {
            return {}
        },
    }
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 5px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .menu-left {
        padding-left: 50px;
    }

    .menu-right {
        padding-left: 50px;
        padding-right: 50px;
    }
</style>