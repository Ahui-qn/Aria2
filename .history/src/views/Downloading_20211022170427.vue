<template>
    <div class="downloading">
        <!-- <div class="edit-status">
            <button @click="editStatus('pause')">暂停</button>    可以使用element的通知来做 或者消息提示
            <button @click="editStatus('unpause')">开始</button>
            <button @click="editStatus('remove')">删除</button>
            <button @click="selectAll">全选</button>
            <label ><input type="text" :value='search' @input="handleSearchChange">搜索</label>
        </div> -->

        <ul>
           <label> 
                <li v-for="(task) of showSearch" :class="task.gid" :key="task.gid"  @click="selectedSwitch(task)"> 
                    <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
                    <span>{{getLinkName(task)}}</span> —— 
                    <router-link :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
                </li>
            </label>
        </ul>

        <el-table
            :data="showSearch"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <el-table-column
                prop="name"
                label="文件名"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="大小"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="progress"
                label="进度"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="剩余时间"
                sortable
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="speed"
                label="下载速度"
            >
            </el-table-column>
        </el-table>
    </div>
</template> 

<script>
import { mapState , mapMutations, mapGetters,  mapActions} from "vuex"
export default {
    name:'downloading',
    data() {
        return {}
    },
    mounted() {
        this.$store.dispatch('asyncUpdateList')
        this.IntervalId = setInterval(() => {

            getProgress(task)
            getDownloadSpeed(task)
            this.$store.dispatch('asyncUpdateList')
        },1000)
    },

    beforeDestroy() {
        clearInterval(this.IntervalId)
    },
    computed : { 
        ...mapState(['search','tasks','selected']),
        ...mapGetters([
            'showSearch',
            ]),
    },
    methods :{
        ...mapActions(['editStatus']),
        ...mapMutations([   // 函数作用注释在store里
            'selectedSwitch',
            'selectAll',
            'getLinkName',
            'getProgress',
            'getDownloadSpeed',
            'updateList',
            'handleSearchChange',
            ]),
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