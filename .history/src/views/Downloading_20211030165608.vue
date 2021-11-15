<style scoped lang="less"> 
  
</style>

<template>
    <Table 
        v-for="(task) of showSearch" 
        @click.native="selectedSwitch(task)"
        class="task" 
        :key="task.gid"
    />
    <!-- 
        传入一个数组来渲染多少个list

     -->
</template> 

<script>

import { mapState , mapMutations, mapGetters,  mapActions} from "vuex"
import Table from  "../components/Tables.vue"
export default {
    name:'downloading',
    data() {
        return {}
    },
    components: {
        Table,
    },
    mounted() {
        this.$store.dispatch('asyncUpdateList')
        this.IntervalId = setInterval(() => {
            this.$store.dispatch('asyncUpdateList')
        },1000)
    },

    beforeDestroy() {
        clearInterval(this.IntervalId)
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
            ]),
    },
}
</script>
