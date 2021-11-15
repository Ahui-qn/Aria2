import Vue from 'vue'
import Vuex from 'vuex'
import Aria2Client from '../aria2-client'
import { MessageBox, Message } from 'element-ui';

Vue.use(Vuex)

function quickSort(arr, sort) {   // 快排小到大
    if (arr.length <= 1) {
        return arr
    }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (sort == true) {  
            if (Number(arr[i].totalLength) < Number(pivot.totalLength)) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }else {
            if (Number(arr[i].totalLength) > Number(pivot.totalLength)) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
    }
    // 递归
    return quickSort(left).concat([pivot], quickSort(right))
}


export default new Vuex.Store({
    state: {
        tasks: [],    //正在下载任务列表，为多个对象
        selected: [],   // 下载页面已选中的task
        search: '',   // 搜索功能输入的内容
        completeds: [],   // 已完成的task数据
        discard: [],  // 已废弃的数据
        sort: true,   // true是从小到大排序， flase是从大到小排序
        aria2: new Aria2Client({
            host: 'localhost',
            port: 6800,
            secret: '123456',
        }),
    },
    getters: {
        showSearch(state) {   // 输入的内容匹配文件名字，搜索
            return function (type, currentPage) {   
                if (state.search == '') {
                    return state[type]
                }else {
                    return state[type].filter(task => {
                        return task.files[0].path.toLowerCase().includes(state.search.toLowerCase())
                    })
                }
            }
              
        },
        getFileSize(state) {
            return function (task) {   // 可能是bt文件的单个{}
                if (task.length) {  // 如果有length 说明是bt文件
                    if(task.length < 1024) {
                        return task.length + 'B'
                    }else if(task.length > 1024 && task.length < 1048576) {
                        return (task.length / 1024).toFixed(2) + 'KB'
                    } else if (task.length > 1048576 && task.length < 1073741824){
                        return (task.length / 1024 / 1024).toFixed(2) + 'MB' 
                    }else {
                        return (task.length / 1024 / 1024 / 1024).toFixed(2) + 'GB'
                    }
                }else {   // 不然则是普通下载链接
                    if(task.totalLength < 1024) {
                        return task.totalLength + 'B'
                    }else if(task.totalLength > 1024 && task.totalLength < 1048576) {
                        return (task.totalLength / 1024).toFixed(2) + 'KB'
                    } else if (task.totalLength > 1048576 && task.totalLength < 1073741824){
                        return (task.totalLength / 1024 / 1024).toFixed(2) + 'MB' 
                    }else {
                        return (task.totalLength / 1024 / 1024 / 1024).toFixed(2) + 'GB'
                    }
                }
               
                
            }
        },
        getDownloadSpeed(state) {   // 当前下载速度
            return function (task) {
                if (task.status == 'paused') {
                    return '暂停中'
                }else if (task.status == 'waiting') {
                    return '等待中'
                }else  if (task.downloadSpeed == '0') {
                    return 0 + 'KB/s'
                }else if (task.downloadSpeed >= 1048576) {
                    return (task.downloadSpeed / 1024 / 1024).toFixed(2) + 'MB/s'
                }else {
                    return (task.downloadSpeed / 1024 ).toFixed(2) + 'KB/s'
                }
                
            }
        },
        getLinkName(state) {
            return function (task) {
                if (task.bittorrent?.info?.name) {
                    return task.bittorrent?.info.name
                }else if (task.files?.[0].path) {  // 如果存在此文件
                    return task.files[0].path.split('/').at(-1) // path存在是一定有文件名的
                }else {
                    return task.files?.[0].uris?.[0].uri.split('/').at(-1) ?? '未知'
                }
            }
        },
        getProgress(state) {   // 当前下载进度，%显示
            return function (task) {
                if (task.completedLength == '0') {  // ???/等于000
                    return 0
                }else {
                    return Number((task.completedLength / task.totalLength * 100).toFixed(1))
                }
            }
        },
    },
    

    mutations: {
        sizeSort(state, currentPage) {  // 接收不同页面给不同的数组排序,completeds, discrad
            if (currentPage == '/completed') {
                state.completeds = quickSort(state.completeds, state.sort)
            }else if (currentPage == '/deleted') {
                state.discard = quickSort(state.discard, state.sort)
                console.log(state.discard)
            }else {
                state.tasks = quickSort(state.tasks, state.sort)
            }
            state.sort = !state.sort
            console.log(state.sort)
        },

        progressSort(state,a,c) {
            console.log('progressSort')
            console.log('route', a,c)
        },

        clearSeleted(state) {
            state.selected = []
        },
        selectedSwitch(state,task) {  // 切换选中selectedSwitch
            let idx = state.selected.indexOf(task.gid)
            if (idx == -1) {
                state.selected.push(task.gid)  // 只传id
            }else {
                state.selected.splice(idx, 1)
            }
        },
        editSeatch(state,value) {  // 搜索功能   //双向绑定
            state.search = value
        },
        selectAll (state) {    // 全部选择函数  // 分为不同页面的全选
            if (location.href.split('/').at(-1) == 'completed') { // 如果是在已完成页面
                if (state.selected.length == state.completeds.length) {
                    state.selected = []
                }else {
                    state.selected = []
                    state.completeds.forEach((task) => {
                        state.selected.push(task.gid)
                    })
                }
            }else if (location.href.split('/').at(-1) == 'deleted'){  // 如果是在正在下载页面
                if (state.selected.length == state.discard.length) {
                    state.selected = []  // 如果两个全都选中则清空数组
                }else {
                    state.selected = []    // 由于是直接全部push进数组，所以先清空之前的单选，这样就不用选的时候判断
                    state.discard.forEach((task) => {
                        state.selected.push(task.gid)
                    })
                }
            }else {
                if (state.selected.length == state.tasks.length) {
                    state.selected = []  // 如果两个全都选中则清空数组
                }else {
                    state.selected = []    // 由于是直接全部push进数组，所以先清空之前的单选，这样就不用选的时候判断
                    state.tasks.forEach((task) => {
                        state.selected.push(task.gid)
                    })
                }
            }
        },
        handleSearchChange(state,e) {   // 搜索双向绑定
            state.search = e.target.value
        },
        updateList(state, tasks) {   // actions触发的task更新赋值函数
            state.tasks = tasks
        },
        editCompleteds(state, {completeds, currentPage}) {
            state.completeds = quickSort(completeds, currentPage)    // 将获取到的completeds赋值到新的completeds上
        },
        editDiscard(state, {discard, currentPage}) {
            state.discard =  quickSort(discard, currentPage) 
        }
    },

    actions: {
        async getTellStopped({commit,state}, currentPage) {   // 分类出已下载完成的和已废弃的
            let completeds = []
            let discard = []
            let tasks = [
                ...await state.aria2.tellStopped(0,1000)
            ]
            for (let val of tasks) {   //tasks是数组
                if (val.status == 'complete') {
                     completeds.push(val)
                }else {
                     discard.push(val)
                }
            }
            commit('editCompleteds', {currentPage, completeds})
            commit('editDiscard', {currentPage, discard})
        },
        async asyncUpdateList({ commit, state}) {     // Downloading组件页面每秒钟调用此函数更新数据
            let tasks = [
                ...await state.aria2.tellActive(),
                ...await state.aria2.tellWaiting(0,100)
            ]
            commit('updateList', tasks)
        },

        async editStatus({ state }, status) {   // 操作task删除、暂停、开始的操作
            if (status == 'remove' || status == 'removeDownloadResult') {
               await MessageBox.confirm('如果文件处于暂停状态删除将无法找回, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    Message({
                      type: 'success',
                      message: '删除成功!',
                      duration:500
                    });
                  }).catch(() => {
                    Message({
                      type: 'info',
                      message: '已取消删除',
                      duration:500
                    });   
                    return        
                  });
            }
            let selectedTask 
            if (location.href.split('/').at(-1) == 'deleted') {   // 不同页面的删除读取不同的数据
                console.log('deleted')
                selectedTask =  state.discard.filter((task) => {
                    return state.selected.includes(task.gid)
                })
            }else if (location.href.split('/').at(-1) == 'completed') {
                selectedTask =  state.completeds.filter((task) => {
                    return state.selected.includes(task.gid)
                })
            }else {
                selectedTask =  state.tasks.filter((task) => {
                    return state.selected.includes(task.gid)
                })
            }
             

            try {
                for (let task of selectedTask) {
                    if (task.status == 'active' && status == 'unpause') continue  // 如果task处于活跃状态且需要恢复
                    if (task.status == 'pause' && status == 'pause') continue  // 如果不是这两个就是remove
                    // 如果是在已完成和已废弃界面发送的删除请求，则通过这个函数删除
                    await state.aria2[status](task.gid)   // 关与暂停、开始、删除操作都是传入gid 
                    // 已删除的任务状态为removed，可以做已完成和已删除分类
            }
            } catch(e) {
                console.log('用element消息通知提示用户已暂停')
            }
            this.dispatch('asyncUpdateList')    // 调用上面的update更新状态
        },
    },
   
    modules: {},
})
