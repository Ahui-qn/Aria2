<template>
    <div class="server">
        <div style="margin-bottom: 20px">
            <el-button size="small" @click="addTab(editableTabsValue)"> add server </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in servers" :key="item.id" :label="item.name" :name="item.id">
                <el-form>
                    <el-form-item label="RPC别名" label-width="80px">
                        <el-input :value="item.name" @input="editNewServer($event, 'name')"></el-input>
                    </el-form-item>
                    <el-form-item label="HOST" label-width="80px">
                        <el-input :value="item.host"  @input="editNewServer($event, 'host')"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号" label-width="80px">
                        <el-input-number :value="item.port"  @input="editNewServer($event, 'port')" :min="1" :max="65535" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="密码" label-width="80px">
                        <el-input type="password" show-password :value="item.secret"  @input="editNewServer($event, 'secret')"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            editableTabsValue: '1',
            newServer: {
                name: '',
                host: '127.0.0.1',
                port: 6800,
                secret: '',
                id: ''   // 用于删除此tab
            },
            tabIndex: 1,   // ID用于删除这个tab
        }
    },
    computed: {
        ...mapState(['servers']),
    },
    mounted() {
        // let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
        // this.initServers(servers)
    },
    methods: {
        ...mapMutations(['initServers','addServers', 'removeServers','editServer']),
        editNewServer(value, type) {
            this.editServer({value, type, currentServerId : this.editableTabsValue})
        },
        addTab(targetId) {   // 添加新的服务器
            let newServer = {} 
            Object.assign(newServer, this.newServer)    // 赋值一份，以免改变this上的newServer
            let newTabId = ++this.tabIndex + ''
            newServer.id = newTabId
            this.addServers(newServer)   // vuex修改
            this.editableTabsValue = newTabId
        },

        removeTab(targetId) {
            console.log(targetId)
            let tabs = this.servers
            let activeId = this.editableTabsValue
            if (activeId === targetId) {
                tabs.forEach((tab, index) => {
                    if (tab.id === targetId) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeId = nextTab.id
                        }
                    }
                })
            }

            this.editableTabsValue = activeId
            this.removeServers({tabs, targetId})
        },
    },
}
/*
    将servers保存在vuex， 添加服务器，nav菜单即可响应式添加
    完成添加，删除，编辑server
    切换服务器的时候，先关闭现在服务器，调用close，然后切换服务器就是new 一个新的aria2， ，再调用raady() ， 连接成功或连接失败, 此操作在vuex完成，连接成功后需要把新的aria2赋值给aria2
    mounted每秒获取状态应改为，连接成功了就获取状态，没有连接成功则clearInterval()
*/
</script>
