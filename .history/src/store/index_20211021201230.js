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

    },
    actions: {},
    modules: {},
})
