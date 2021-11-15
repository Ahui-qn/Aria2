<template>
    <div id="app">
        <div class="el">
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                text-color="#fff"
                active-text-color="#ffd04b"
                background-color="#232228"
                :router="true"
                :default-active="currentPath()"
            >
                <el-menu-item index="/">正在下载</el-menu-item>
                <el-menu-item index="/new">新建下载</el-menu-item>
                <el-menu-item index="/basicsettings">Aria2设置</el-menu-item>
                <el-menu-item index="/advancedsettings">服务器连接</el-menu-item>
                <!-- 将搜索定位到此处-->
            </el-menu>

            <div>
                <el-row class="tac">
                    <el-col :span="12">
                        <h5>自定义颜色</h5>
                        <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                        >
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>导航一</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title">分组一</template>
                                    <el-menu-item index="1-1">选项1</el-menu-item>
                                    <el-menu-item index="1-2">选项2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="分组2">
                                    <el-menu-item index="1-3">选项3</el-menu-item>
                                </el-menu-item-group>
                                <el-submenu index="1-4">
                                    <template slot="title">选项4</template>
                                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航二</span>
                            </el-menu-item>
                            <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
        </div>
        <router-view :aria2="aria2"></router-view>
    </div>
</template>

<script>
import Aria2Client from './aria2-client.js'

export default {
    name: 'App',
    data() {
        return {
            aria2: new Aria2Client({
                host: 'localhost',
                port: 6800,
                secret: '123456',
            }),
        }
    },
    methods: {
        currentPath() {
            return /\/\w*\/?/.exec(location.hash)[0]
        },
    },
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    .el /deep/ .el-menu {
        border: 2px red solid;
    }
}
</style>
