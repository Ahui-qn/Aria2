<template>
    <div id="app">
        <div class="el">
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
                :default-active="currentPath()"
            >
                <el-menu-item index="/">下载</el-menu-item>
                <el-menu-item index="/new">新建</el-menu-item>
                <el-menu-item index="/basicSettings">设置</el-menu-item>
                <el-menu-item index="/advancedSettings">服务器</el-menu-item>
                <!-- 将搜索定位到此处-->
            </el-menu>
        </div>
        <div class="downloadContainer">
            <router-view :aria2="aria2"></router-view>
        </div>
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
           return  /\/\w*\/?/.exec(location.hash)[0]
        }
    },
}
</script>

<style lang="less">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .app{
        .el{
            /deep/ .el-menu{
                background-color:rgba(167, 63, 63, 0) ;
            }
        }
    }
</style>
