<style scoped lang="less">
    .taskContiner {
        height: 82vh;
        overflow: auto;
    }
</style>
<template>
    <div>
        <Header  :isShowSpeed="false" />
        <div class="taskContiner">
            <Tables 
                v-for="(task) of completedsShowSearch" 
                @click.native="selectedSwitch(task)" 
                :key="task.gid"
                :filename="getLinkName(task)"
                :filesize="getFileSize(task)"
                :progress="getProgress(task)"
                :selected="selected"
                :task="task"
                :isShowSpeed="false"
            />
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations} from 'vuex'
import Tables from '../components/Tables.vue'
import Header from '../components/Header.vue'
export default {
    name:'completed',
    data() {
        return {}
    },
    components: {
        Tables,
        Header
    },
    mounted() {
        this.$store.dispatch('getTellStopped')
        this.intervalCompletedsId = setInterval(() => {
            this.$store.dispatch('getTellStopped')
        },1000)
        console.log('completeds',this.completeds)
    },
    beforeDestroy() {  // 由于一个按钮要控制两个页面的全选，所以在这个组件销毁的时候需要清除上个组件的选中
        clearInterval(this.intervalCompletedsId)
        this.clearSeleted()
    },
    computed: {
        ...mapState(['completeds','selected']),
        ...mapGetters([
            'getLinkName',
            'getFileSize',
            'getProgress',
            'completedsShowSearch'
        ]),
    },
    methods: {
        ...mapMutations(['selectedSwitch', 'clearSeleted'])
    },
}
</script>