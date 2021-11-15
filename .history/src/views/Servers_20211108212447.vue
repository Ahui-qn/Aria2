<template>
    <div class="server">
        <div style="margin-bottom: 20px">
            <el-button size="small" @click="addTab(editableTabsValue)"> add tab </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in servers" :key="item.name" :label="item.title" :name="item.name">
                {{ item.content }}
            </el-tab-pane>
        </el-tabs>
        <el-dropdown size="small" split-button type="primary">
                            小型尺寸
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item>双皮奶</el-dropdown-item>
                                <el-dropdown-item>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editableTabsValue: '2',
            servers: [
                {
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content',
                },
                {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content',
                },
            ],
            tabIndex: 2,
        }
    },
    methods: {
        addTab(targetName) {
            let newTabName = ++this.tabIndex + ''
            this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content',
            })
            this.editableTabsValue = newTabName
        },
        removeTab(targetName) {
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
// servers 保存服务器，
</script>
