<template>
    <div class="server">
        <div style="margin-bottom: 20px">
            <el-button size="small" @click="addTab(editableTabsValue)"> add tab </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                <el-form>
                    <el-form-item label="RPC别名" label-width="80px">
                        <el-input v-model="newServer.name"></el-input>
                    </el-form-item>
                    <el-form-item label="HOST" label-width="80px">
                        <el-input v-model="newServer.host"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号" label-width="80px">
                        <el-input-number v-model="newServer.port" :min="1" :max="65535"></el-input-number>
                    </el-form-item>
                    <el-form-item label="密码" label-width="80px">
                        <el-input type="password" show-password v-model="newServer.secret"></el-input>
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
            editableTabsValue: '2',
            servers: [
                {
                    name: '',
                    host: '127.0.0.1',
                    port: 6800,
                    secret: '',
                    id: '1'   
                },
                {
                    name: '',
                    host: '127.0.0.1',
                    port: 6800,
                    secret: '',
                    id: '1'   
                },
                {
                    name: '',
                    host: '127.0.0.1',
                    port: 6800,
                    secret: '',
                    id: '1'   
                },

            ],
            tabIndex: 1,   // ID用于删除这个tab
        }
    },
    computed: {
        ...mapState(['servers']),
    },
    mounted() {
        let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
        this.initServers(servers)
    },
    methods: {
        ...mapMutations(['initServers']),

        addserver() {

        },

        addTab(targetId) {
            console.log(targetId)   // targetId为当前的
            let newTabId = ++this.tabIndex + ''
            this.servers.push({
                name: '',
                host: '127.0.0.1',
                port: 6800,
                secret: '',
                id: newTabId   // 用于删除此tab
            })
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
            this.servers = tabs.filter((tab) => tab.id !== targetId)
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
