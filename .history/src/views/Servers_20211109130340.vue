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
                        <el-input-number v-model="newServer.port"></el-input-number>
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
            editableTabs: [
                {
                    title: 'Tab 1',
                    name: '1',  // 将id存在name上
                    content: 'Tab 1 content',
                },
                {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content',
                },
            ],
            newServer: {    // 添加新的服务器，修改完之后push到servers
                name: '',
                host: '127.0.0.1',
                port: 6800,
                secret: '',
            },
            tabIndex: 2,   // ID用于删除这个tab
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









        addTab(targetName) {
            console.log(targetName)   // targetName为当前的
            let newTabName = ++this.tabIndex + ''
            this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content',
            })
            this.editableTabsValue = newTabName
        },
        removeTab(targetName) {
            console.log(targetName)
            let tabs = this.editableTabs
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }

            this.editableTabsValue = activeName
            this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
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
