<style scoped lang="less"> 
    .taskContiner {
        height: 82vh;
        overflow: auto;
    }
</style>

<template>
    <div id="dowloading">
        <Header :isShowSpeed="true"/>
        <div class="taskContiner">
            <Tables 
                v-for="(task) of showSearch('tasks')"
                @click.native="selectedSwitch(task)"
                :key="task.gid"
                :filename="getLinkName(task)"
                :filesize="getFileSize(task)"
                :progress="getProgress(task)"
                :speed="getDownloadSpeed(task)"
                :selected="selected"
                :task="task"
            />
        </div>
    </div>
</template> 

<script>

import { mapState , mapMutations, mapGetters,  mapActions} from "vuex"
import Header from '../components/Header.vue'
import Tables from  "../components/Tables.vue"
export default {
    name:'downloading',
    data() {
        return {}
    },
    components: {
        Tables,
        Header,
    },
    mounted() {
        // this.updateList()
        this.$store.dispatch('updateList')
        this.IntervalDowloadingId = setInterval(() => {
            // this.updateList()
            this.$store.dispatch('updateList', this.IntervalDowloadingId)
        },1000)
    },
    watch: {
        '$store.state.aira2' :function () {
            cosnole.log('监听中')
        }
    },

    beforeDestroy() {
        clearInterval(this.IntervalDowloadingId)
        this.clearSeleted()
    },
    computed : { 
        ...mapState(['selected', 'connectionStatus','aria2']),
        ...mapGetters([
            'showSearch',
            'getLinkName',
            'getProgress',
            'getDownloadSpeed',
            'getFileSize'
            ]),
    },
    methods :{
        ...mapActions(['editStatus']),
        ...mapMutations([   // 函数作用注释在store里
            'selectedSwitch',
            'selectAll',
            'editUpdateList',
            'handleSearchChange',
            'clearSeleted',
            ]),
        // async updateList() {     // Downloading组件页面每秒钟调用此函数更新数据
        //     let tasks = []
        //     try {
        //             tasks = [
        //             ...await this.aria2.tellActive(),
        //             ...await this.aria2.tellWaiting(0,100)
        //         ]
        //     }catch (e) {
        //         clearInterval(this.IntervalDowloadingId)   // 如果连接失败则清除定时器
        //     }
        //     this.editUpdateList(tasks)
        // },
    },

}
</script>
