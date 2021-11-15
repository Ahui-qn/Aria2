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
        .outmost-menu {
            border: none;
            width: 180px;
            height: 100%;
            box-shadow:5px 10px 10px 0px #0069994c;
            background-image:linear-gradient(#009ae1, #0052b9);
            padding-top: 10px;
            i {
                color: white;
            }
            .frist {
                margin-top: 14px;
            }
            img {
                display: block;
                width: 50px;
                margin-left: 40px;
            }
            .el-submenu {
                .el-menu {
                    background-color: #1c66ab;
                    .el-menu-item {
                        min-width: 0;
                    }
                    .el-menu-item:focus {   // 设置分组里focus颜色
                        background-color: #173658;
                    }
                    .el-menu-item-group__title {
                        display: none;
                    }
                }
            }
            .is-active {       //设置分组外层的focus颜色
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
        height: 100%;
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
                    color: #4355bd;
                    top: 50%;
                    transform: translateY(-50%);
                    border: none;
                    font-size: 16px;
                    a {
                        text-decoration:none;
                        color: #4355bd;
                    }
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
                    .is-disabled {
                        color: rgba(255, 255, 255, 0.571);
                    }
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

<template>
    <div id="app">
        <div class="el">
            <el-menu class="outmost-menu" text-color="#fff" active-text-color="#ffd04b" :router="true" :default-active="currentPath()">
                <img class="" src="./assets/logo.png" alt="" />
                <el-menu-item class="frist" index="/">
                    <i class="el-icon-download"></i>
                    <span slot="title">正在下载</span>
                </el-menu-item>
                <el-menu-item index="/completed">
                    <i class="el-icon-check"></i>
                    <span slot="title">已完成</span>
                </el-menu-item>
                <el-menu-item index="/deleted">
                    <i class="el-icon-close"></i>
                    <span slot="title">已删除 / 废弃</span>
                </el-menu-item>
                <el-submenu index="/settings">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/settings/basic">基础设置</el-menu-item>
                        <el-menu-item index="/settings/http">HTTP设置</el-menu-item>
                        <el-menu-item index="/settings/rpc">RPC设置</el-menu-item>
                        <el-menu-item index="/settings/advanced">高级设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/server">
                    <i class="el-icon-monitor"></i>
                    <span slot="title">服务器</span>
                </el-menu-item>
            </el-menu>
        </div>
        <header>
            <nav>
                <div class="edit-status">
                    <router-link to="/new">
                        <el-button type="primary" class="new" icon="el-icon-circle-plus">新建</el-button>
                    </router-link>
                    <el-button-group>
                        <el-checkbox @change="selectAll" :value="switchSelection"></el-checkbox>   <!--全选按钮 ,拿取到当前组件的内容传递过去-->
                        <el-button :disabled="isDisabled"  type="primary" icon="el-icon-video-play" @click.native="editStatus('unpause')"></el-button>  <!--开始按钮-->
                        <el-button :disabled="isDisabled"  type="primary" icon="el-icon-video-pause" @click.native="editStatus('pause')"></el-button>  <!--暂停按钮-->
                        <el-button type="primary" icon="el-icon-delete" @click.native="removeTask()"></el-button>   <!--删除按钮，这里传入不同的参数-->
                    </el-button-group>
                    <el-select v-model="selectedServer "  :value-key="" clearable placeholder="请选择">
                        <el-option
                        v-for="server in servers"
                        :key="server.id"
                        :label="server.name || server.host + ':' + server.port"
                        :value="server">
                        </el-option>
                    </el-select>
                    <label class="search"><input type="text" @input="editSeatch($event.target.value)"/><span>搜索</span></label>
                </div>
            </nav>
            <router-view ></router-view>
        </header>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    name: 'App',
    data() {
        return {
            selectedServer:  null // 存放服务器select选中的server.name
        }
    },
    mounted() {
        this.selectedServer = this.servers[0]
    },
    computed: {
        ...mapState(['tasks','search', 'selected', 'completeds','discard', 'servers']),
        isDisabled () {
            let currentPage = this.$route.path
            if (currentPage == '/completed' || currentPage == '/deleted') {
                return true
            }else {
                return false
            }
        },
        switchSelection() {  // 根据不同页面绑定不同的数据
            let currentPage = this.$route.path
            if (currentPage == '/completed') {

                if ((this.selected.length == this.completeds.length) && (this.selected.length != 0 || this.completeds.length != 0)) {
                    return true
                }else {
                    return false
                }

            }else if (currentPage == '/deleted'){
                if (this.selected.length == this.discard.length && (this.selected.length != 0 || this.discard.length != 0)) {
                    return true
                }else {
                    return false
                }

            }else {
                if (this.selected.length == this.tasks.length && (this.selected.length != 0 || this.tasks.length != 0)) {
                    return true
                }else {
                    return false
                }
            }
        },
    },
    methods: {
        removeTask() {
            let currentPage = this.$route.path
            if (currentPage == '/completed' || currentPage == '/deleted') {  // 正在下载界面和已完成还有已废弃的删除是不同的
                this.editStatus('removeDownloadResult')  // 这个删除能从内存中释放已完成或已废除的下载
            }else {
                this.editStatus('remove')
            }
        },
         ...mapActions([
            'editStatus',
            ]),
        ...mapMutations([
            'selectAll',
            'editSeatch'
            ]),
        currentPath() {
            return /\/\w*\/?/.exec(location.hash)[0]
        },
    },
}
</script>


