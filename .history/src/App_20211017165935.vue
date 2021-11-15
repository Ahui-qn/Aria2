<template>
    <div id="app">
        <div class="el">
            <el-menu text-color="#fff" active-text-color="#ffd04b" :router="true" :default-active="currentPath()">
                <img class="" src="./assets/logo.png" alt="" />
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
            <nav>
                <div class="edit-status">
                    <el-button type="primary" class="new" icon="el-icon-circle-plus">新建</el-button>
                    <el-button-group>
                        <el-checkbox ></el-checkbox>
                        <el-button type="primary" icon="el-icon-video-play"></el-button>
                        <el-button type="primary" icon="el-icon-video-pause"></el-button>
                        <el-button type="primary" icon="el-icon-delete"></el-button>
                    </el-button-group>
                    <label class="search"><input type="text" /><span>搜索</span></label>
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
    height: 100%;
     .el {
         height: 100%;
        .el-menu {
            border: none;
            width: 180px;
            height: 100%;
            box-shadow:2px 0px 4px 0px #0b1c2e6e;
            background-image:linear-gradient(#3a547d, #263b5c);
            padding-top: 10px;
            img {
                display: block;
                width: 50px;
                margin-left: 40px;
            }
            .is-active {
                background-color: rgb(90, 155, 230);
            }
            .el-menu-item:hover {
                background-color: #173658;
            }
            .el-submenu__title:hover {
                background-color: #173658;
            }
        }
    }
    header {
        flex-grow: 1;
        nav {
            height: 60px;
            width: 100%;
            background-image:linear-gradient(to right, #3a547d, #7798cd);
            position: relative;
            box-shadow:#131f5c 1px 1px 3px 0px;
            .edit-status {
                height: 100%;
                .new {
                    margin-left: 20px;
                    background-color: rgb(128, 158, 210);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    border: none;
                }
                .new::after {
                    content: '';
                    height: 30px;
                    width: 2px;
                    background-color: rgb(210, 210, 210);
                    position: absolute;
                    top: 5px;
                    right: -30px;
                }
                .el-button-group::before {
                    content: none;
                }
                .el-button-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    height: 50px;
                    width: 160px;
                    position: absolute;
                    left: 160px;
                    top:53%;
                    transform: translateY(-50%);
                    .el-checkbox__inner{
                        width: 18px;
                        height: 18px;
                    }
                    .el-checkbox__inner::after{
                        width: 7px;
                        height: 13px;
                        transform:rotate(42deg) scaleY(1) translate(-1px,-2px);
                    }

                    .el-button--primary {
                        border:none
                    }
                    .el-button{
                        background-color: rgba(255, 127, 80, 0);
                        border-radius: 0;
                        padding: 0;
                        i {
                            font-size: 25px;
                        }
                    }
                }
                label.search {
                    position: absolute;
                    top: 50%;
                    right: 50px;
                    transform: translateY(-50%);
                    span {
                        color: rgb(150, 150, 150);
                        position: absolute;
                        top: 3px;
                        right: 20px;
                        font-weight: 200;
                        font-size: 14px;
                    }
                    input {
                        width: 180px;
                        height: 25px;
                        border-radius: 999px;
                        border: none;
                        margin-right: 8px;
                        padding: 0 10px;
                    }
                }
            }
        }
    }
}
</style>
