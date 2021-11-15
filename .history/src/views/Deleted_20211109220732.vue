<style scoped lang="less">
    .taskContiner {
        height: 82vh;
        overflow: auto;
        box-shadow: red;
    }
</style>
<template>
    <div class="deleted">
        <Header  :isShowSpeed="false" />
        <div class="taskContiner">
            <Tables 
                v-for="(task) of showSearch('discard')" 
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
    name:'discard',
    data() {
        return {}
    },
    components: {
        Tables,
        Header
    },
    mounted() {
       this.updateDiscard()
    },
    beforeDestroy() {  // 由于一个按钮要控制两个页面的全选，所以在这个组件销毁的时候需要清除上个组件的选中
        clearInterval(this.intervalDiscardId)
        this.clearSeleted()
    },
     watch : {
        aria2c() {
            clearInterval(this.intervalDiscardId)
            this.updateCompleted()
        }
    },
    computed: {
        ...mapState(['discard','selected', 'aria2']),
        ...mapGetters([
            'getLinkName',
            'getFileSize',
            'getProgress',
            'showSearch'
        ]),
    },
    methods: {
        ...mapMutations(['selectedSwitch', 'clearSeleted']),
        updateDiscard() {
            this.$store.dispatch('getTellStopped')
            this.intervalDiscardId = setInterval(() => {
                this.$store.dispatch('getTellStopped', this.intervalDiscardId)
            },1000)
            console.log('deleted',this.discard)
        }
    },
}
</script>