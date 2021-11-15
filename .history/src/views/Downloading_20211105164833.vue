<style scoped lang="less"> 
</style>

<template>
    <div id="dowloading">
        <Header :isShowSpeed="true"/>
        <Tables 
            v-for="(task) of showSearch"
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
        this.$store.dispatch('asyncUpdateList')
        this.IntervalId = setInterval(() => {
            this.$store.dispatch('asyncUpdateList')
        },1000)
    },

    beforeDestroy() {
        clearInterval(this.IntervalId)
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
