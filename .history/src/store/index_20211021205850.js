import Vue from 'vue'
import Vuex from 'vuex'
import Aria2Client from '../aria2-client'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],    //正在下载任务列表，为多个对象
        search: '',   // 搜索功能输入的内容
        selected: [], // 用来存已经选中的task
        aria2: new Aria2Client({
            host: 'localhost',
            port: 6800,
            secret: '123456',
        }),
    },
    mutations: {
        selectAll (state) {
            if (state.selected.length == state.tasks.length) {
                state.selected = []
            }else {
                state.tasks.forEach((task) => {
                    state.selected.push(task.gid)
                })
            }
        },
       async editStatus(state,status) {
            if (status == 'remove') {
                try {
                   await this.$confirm('确定删除？')   // element组件库的函数，返回一个promise
                }catch(e) {
                    return 
                }
            }
            let selectedTask =  state.tasks.filter((task) => {
                return state.selected.includes(task.gid)
            })

            try {
                for (let task of selectedTask) {
                    if (task.status == 'active' && status == 'unpause') continue
                    if (task.status == 'pause' && status == 'pause') continue  // 如果不是这两个就是remove
                    await state.aria2[status](task.gid)   // 关与暂停、开始、删除操作都是传入gid 
                    // 已删除的任务状态为removed，可以做已完成和已删除分类
            }
            } catch(e) {
                console.log('用element消息通知提示用户已暂停')
            }
            this.updateList()
        },

        selectedSwitch(state, task) {  // 切换选中selectedSwitch
            let idx = state.selected.indexOf(task.gid)
            if (idx == -1) {
                state.selected.push(task.gid)  // 只传id
            }else {
                state.selected.splice(idx, 1)
            }
        },
        async updateList(state) {
            state.tasks = [
                ...await state.aria2.tellActive(),
                ...await state.aria2.tellWaiting(0,100)
            ]
        },
        getProgress(state, task) {
            if (task.completedLength == '0') {
                return 0
            }else {
                return task.completedLength / task.totalLength * 100 
            }
        },
        getDownloadSpeed(state, task) {
            if (task.downloadSpeed == '0') {
                return 0 + 'KB/s'
            }else if (task.downloadSpeed >= 1048576) {
                return (task.downloadSpeed / 1024 / 1024).toFixed(2) + 'MB/s'
            }else {
                return (task.downloadSpeed / 1024 ).toFixed(2) + 'KB/s'
            }
        },
        getLinkName(state, task) {
            if (task.files?.[0].path) {  // 如果存在此文件
                return task.files[0].path.split('/').at(-1) // path存在是一定有文件名的
            }else {
                task.files?.[0].uris?.[0].uri.split('/').at(-1) ?? '未知'
            }
        },
        getStatus(state, task) {
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
    },
    getters: {
        showSearch(state) {   // 输入的内容匹配文件名字，搜索 
            if (state.search == '') {
                return state.tasks
            }else {
                return state.tasks.filter(task => {
                    return task.files[0].path.toLowerCase().includes(state.search.toLowerCase())
                })
            }
        }
    },
    modules: {},
})
