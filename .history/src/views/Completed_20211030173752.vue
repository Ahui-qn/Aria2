<template>
    <div>
        <Header/>
        <Tables 
            v-for="(task) of completeds" 
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
</template>
<script>
import { mapState, mapActions, mapGetters} from 'vuex'
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
        this.$store.dispatch('getCompletedName')
        this.intervalId = setInterval(() => {
            this.$store.dispatch('getCompletedName')
        },1000)
    },
    beforeDestroy() {
        clearInterval(this.IntervalId)
    },
    computed: {
        ...mapState(['completeds','seleted'])
    },
    methods: {
        ...mapActions(['getCompletedName']),
        ...mapGetters([
            'getLinkName',
            getFileSize
        ]),
    }
}
</script>