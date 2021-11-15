<template>
    <div class="downloading">
        <div class="edit-status">
            <button @click="editStatus('pause')">暂停</button> <!-- 可以使用element的通知来做 或者消息提示-->
            <button @click="editStatus('unpause')">开始</button>
            <button @click="editStatus('remove')">删除</button>
            <button @click="selectAll">全选</button>
            <label ><input type="text" :value='search' @input="handleSearchChange">搜索</label>
        </div>
        <ul>
           <label> 
                <li v-for="(task) of showSearch" :class="task.gid" :key="task.gid" @click="selectedSwitch(task)"> 
                    <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
                    <span>{{getLinkName(task)}}</span> —— 
                    <span>{{getProgress(task) | fixed}}%</span> —— 
                    <span>{{getDownloadSpeed(task)}}</span>- - - -
                    <span>{{getStatus(task)}}</span>
                    <router-link :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
                </li>
            </label>
        </ul>
    </div>
</template> 

<script>
import { mapState , mapMutations, mapGetters,  mapActions} from "vuex"
export default {
    name:'downloading',
    data() {
        return {
            c : 1
        }
    },
    mounted() {

        this.$store.dispatch('asyncUpdateList')
        // this.IntervalId = setInterval(() => {
        //     this.$store.dispatch('asyncUpdateList')
        // },5000)
    },

    beforeDestroy() {
        clearInterval(this.IntervalId)
    },
    computed : { 
        ...mapState(['search', 'selected','tasks']),
        ...mapGetters(['showSearch',]),
    },
    methods :{
        ...mapActions(['editStatus']),
        ...mapMutations([   // 函数作用注释在store里
            'selectAll',
            'editStatus',
            'updateList',
            'getDownloadSpeed',
            'getLinkName',
            'getStatus',
            'handleSearchChange',
            ]),
            getProgress(task) {   // 当前下载进度，%显示
            if (task.completedLength == '0') {  // ???/等于000
                return 0
            }else {
                return task.completedLength / task.totalLength * 100 
            }
        },
        
    },
}
</script>
<style scoped lang="less"> 
    .downloading {
        margin-left: 50px;
        .edit-status {
            button{
                margin-right:5px ;
            }
        }
        ul {
            padding-left:0 ;
            li {
                list-style: none;
            }
        }
    }
</style>