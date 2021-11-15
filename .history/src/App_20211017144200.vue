<template>
    <div id="app">
        <div class="el">
            <el-menu text-color="#fff" active-text-color="#ffd04b" :router="true" :default-active="currentPath()">
                <img class="" src="./assets/logo.png" alt="">
                <el-menu-item index="/">
                    <i class="el-icon-menu"></i>
                    <span slot="title">正在下载</span>
                </el-menu-item>
                <el-menu-item index="/completed">
                    <i class="el-icon-document"></i>
                    <span slot="title">已完成</span>
                </el-menu-item>
                <el-menu-item index="/deleted">
                    <i class="el-icon-setting"></i>
                    <span slot="title">废纸篓</span>
                </el-menu-item>
                <el-submenu index="/settings">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">基础设置</el-menu-item>
                        <el-menu-item index="1-1">HTTP设置</el-menu-item>
                        <el-menu-item index="1-1">RPC设置</el-menu-item>
                        <el-menu-item index="1-1">高级设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/server">
                    <i class="el-icon-setting"></i>
                    <span slot="title">服务器</span>
                </el-menu-item>
            </el-menu>
        </div>
        <header>
            <nav >
                <div class="edit-status">
                    <el-button type="primary" class="new" icon="el-icon-search">新建</el-button>
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-edit"></el-button>
                        <el-button type="primary" icon="el-icon-share"></el-button>
                        <el-button type="primary" icon="el-icon-delete"></el-button>
                        <el-button type="primary" icon="el-icon-delete"></el-button>
                    </el-button-group>
                    <label><input type="text" >搜索</label>
                </div>
            </nav>
            <router-view :aria2="aria2"></router-view>
        </header>
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

<style lang="less" scopen>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    display: flex;
    header {
        flex-grow: 1;
        nav{
            height: 50px;
            width: 100%;
            background-color: rgba(35, 71, 109, 0.79);
            .edit-status{
                height: 100%;
                .new {
                   margin-left:20px;

               }
               .el-button {
                   
                   height: 100%;
               }
               .el-button-group {
                   margin-top: -1px;
                   margin-left:20px;
                   height: 100%;
                   .el-button {
                       background-color: rgba(255, 127, 80, 0);
                       
                   }
               }
            }
        }
    }
    .el {
        .el-menu {
            border: none;
            width: 180px;
            height: 100vh;
            background-color: rgb(59, 84, 125);
            img {
                display: block;
                width: 50px;
                margin-left:40px;
            }
            .el-menu-item {
            }
        }
    }
}
</style>
