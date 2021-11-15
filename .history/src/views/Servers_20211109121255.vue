<template>
    <div class="server">
        <div style="margin-bottom: 20px">
            <el-button size="small" @click="addTab(editableTabsValue)"> add tab </el-button>
        </div>

        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in servers" :key="item.id" :label="item.title" :name="item.id">
                {{ item.content }}
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    data() {
        return {
            editableTabsValue: '2',
            tabIndex: 2,
        }
    },
    computed : {
        ...mapState(['servers', 'newServers']),
    },
    methods: {
        ...mapMutations(['initServers']),
        addTab(targetName) {
            let tabIndex = ++this.tabIndex + ''
            this.servers.push(this.newServers)
            this.editableTabsValue = newTabName
        },
        removeTab(targetName) {
            let tabs = this.servers
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
            this.servers = tabs.filter((tab) => tab.name !== targetName)
        },
    },
    mounted() {
        let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
        this.initServers(servers)
    }
}
/*
    将servers保存在vuex， 添加服务器，nav菜单即可响应式添加
    完成添加，删除，编辑server
    切换服务器的时候，先关闭现在服务器，调用close，然后切换服务器就是new 一个新的aria2， ，再调用raady() ， 连接成功或连接失败, 此操作在vuex完成，连接成功后需要把新的aria2赋值给aria2
    mounted每秒获取状态应改为，连接成功了就获取状态，没有连接成功则clearInterval()
*/ 

</script>
