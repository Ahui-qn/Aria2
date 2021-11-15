import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],    //正在下载任务列表，为多个对象
        search: '',   // 搜索功能输入的内容
        selected: [], // 用来存已经选中的task
    },
    mutations: {
        selectAll () {
            if (this.selected.length == this.tasks.length) {
                this.selected = []
            }else {
                this.tasks.forEach((task) => {
                    this.selected.push(task.gid)
                })
            }
        },
       async editStatus(status) {
            if (status == 'remove') {
                try {
                   await this.$confirm('确定删除？')   // element组件库的函数，返回一个promise
                }catch(e) {
                    return 
                }
            }
            let selectedTask =  this.tasks.filter((task) => {
                return this.selected.includes(task.gid)
            })

            try {
                for (let task of selectedTask) {
                    if (task.status == 'active' && status == 'unpause') continue
                    if (task.status == 'pause' && status == 'pause') continue  // 如果不是这两个就是remove
                    await this.aria2[status](task.gid)   // 关与暂停、开始、删除操作都是传入gid 
                    // 已删除的任务状态为removed，可以做已完成和已删除分类
            }
            } catch(e) {
                console.log('用element消息通知提示用户已暂停')
            }
            this.updateList()
        },

        selectedSwitch(task) {  // 切换选中selectedSwitch
            let idx = this.selected.indexOf(task.gid)
            if (idx == -1) {
                this.selected.push(task.gid)  // 只传id
            }else {
                this.selected.splice(idx, 1)
            }
        },
        // async updateList() {
        //     this.tasks = [
        //         ...await this.aria2.tellActive(),
        //         ...await this.aria2.tellWaiting(0,100)
        //     ]
        // },
        getProgress(task) {
            if (task.completedLength == '0') {
                return 0
            }else {
                return task.completedLength / task.totalLength * 100 
            }
        },
        getDownloadSpeed(task) {
            if (task.downloadSpeed == '0') {
                return 0 + 'KB/s'
            }else if (task.downloadSpeed >= 1048576) {
                return (task.downloadSpeed / 1024 / 1024).toFixed(2) + 'MB/s'
            }else {
                return (task.downloadSpeed / 1024 ).toFixed(2) + 'KB/s'
            }
        },
        getLinkName(task) {
            if (task.files?.[0].path) {  // 如果存在此文件
                return task.files[0].path.split('/').at(-1) // path存在是一定有文件名的
            }else {
                task.files?.[0].uris?.[0].uri.split('/').at(-1) ?? '未知'
            }
        },
        getStatus(task) {
            if (task.status == 'paused') {
                return '暂停中'
            }else if (task.status == 'active') {
                return '下载中'
            }else {
                return '等待中'
            }
        },
    },
    actions: {
        showSearch() {   // 输入的内容匹配文件名字，搜索 
            if (this.search == '') {
                return this.tasks
            }else {
                return this.tasks.filter(task => {
                    return task.files[0].path.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    },
    modules: {},
})
