<template>
    <div id="app">
        <div class="nav">
            <p>
                <router-link to="/">正在下载</router-link>
            </p>
            <p>
                <router-link to="/completed">已完成</router-link>
            </p>
            <p>
                <router-link to="/new">新建下载</router-link>
            </p>
            <p>
                <router-link to="/basicSettings">基本设置</router-link>
            </p>
            <p>
                <router-link to="/advancedSettings">高级设置</router-link>
            </p>
        </div>
        <div class="el">
        
            <div class="line"></div>
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
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
    methods: {},
    mounted() {},
}
</script>

<style lang="less">
#app {
    display: flex;
    margin-top: 0;
    .nav {
        width: 100px;
        height: 100vh;
        border-right: 1px solid red;
    }
}
</style>
