<template>
    <div class="downloading">
        <div class="edit-status">
            <button @click="editStatus('pause')">暂停</button> <!-- 可以使用element的通知来做 或者消息提示-->
            <button @click="editStatus('unpause')">开始</button>
            <button @click="editStatus('remove')">删除</button>
            <button @click="selectAll">全选</button>
            <label ><input type="text" v-model="search">搜索</label>
        </div>
        <ul>
           <label> 
                <li v-for="(task, idx) of showSearch" :key="idx" @click="selectedSwitch(task)"> 
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
import { mapState , mapMutations, mapGetters} from "vuex"
export default {
    name:'downloading',
    data() {
        return {
            
        }
    },
    // mounted() {
    //     this.updateList()  // 在初始化的时候调用一次，不然可能有间隙
    //     this.IntervalId = setInterval(() => {
    //         this.updateList()
    //     },1000)
    // },

    // beforeDestroy() {
    //     clearInterval(this.IntervalId)
    // },
    computed : { 
        ...mapState(['search', 'selected','tasks']),
    },
    methods :{
       ...mapMutations([
            'selectAll',
            'editStatus',
            'selectedSwitch',
            'updateList',
            'getProgress',
            'getDownloadSpeed',
            'getLinkName',
            'getStatus',
            ])
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