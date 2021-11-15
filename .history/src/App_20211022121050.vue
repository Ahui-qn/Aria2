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
                    <span  class="el-icon-circle-plus-outline new">新建
                    </span>
                    <span></span>   <!-- 分割线-->
                    <el-button-group>
                        <el-checkbox @click.native="selectAll"></el-checkbox>   <!--全选按钮-->
                        <el-button type="primary" icon="el-icon-video-play" @click.native="editStatus('pause')"></el-button>  <!--开始按钮-->
                        <el-button type="primary" icon="el-icon-video-pause" @click.native="editStatus('unpause')"></el-button>  <!--暂停按钮-->
                        <el-button type="primary" icon="el-icon-delete" @click.native="editStatus('remove')"></el-button>   <!--删除按钮-->
                    </el-button-group>
                    <label class="search"><input type="text" /><span>搜索</span></label>
                </div>
            </nav>
            <router-view ></router-view>
        </header>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'App',
    data() {
        return {
        }
    },
    methods: {
         ...mapActions([
            'editStatus',
            ]),
        ...mapMutations([
            'selectAll',
            ]),
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
            box-shadow:5px 10px 10px 0px #00689982;
            background-image:linear-gradient(#009ae1, #0052b9);
            padding-top: 10px;
            img {
                display: block;
                width: 50px;
                margin-left: 40px;
            }
            .is-active {
                background-color: #173658;
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
            height: 70px;
            width: 100%;
            background-image:linear-gradient(to right, #009ae1, #54b5ff);
            position: relative;
            box-shadow:#09a2e9 0px 5px 0px 0px;
            .edit-status {
                height: 100%;
                padding-left:20px;
                .new {
                    margin-left: 20px;
                    background-color: #fff;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    border: none;
                    color: #4355bd;
                    font-size: 16px;
                    i {
                        font-size: 18px;
                    }
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
                    left: 190px;
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
                        top: 6px;
                        right: 20px;
                        font-weight: 200;
                        font-size: 14px;
                    }
                    input {
                        width: 180px;
                        height: 30px;
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
