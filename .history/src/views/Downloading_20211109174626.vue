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
        try {
            this.$store.dispatch('asyncUpdateList')
        this.IntervalDowloadingId = setInterval(() => {
            this.$store.dispatch('asyncUpdateList')
        },1000)
        }catch (e) {
            console.log(e)
        }
        
    },
    
    beforeDestroy() {
        clearInterval(this.IntervalDowloadingId)
        this.clearSeleted()
    },
    computed : { 
        ...mapState(['selected']),
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
            'updateList',
            'handleSearchChange',
            'clearSeleted'
            ]),
    },

}
</script>
