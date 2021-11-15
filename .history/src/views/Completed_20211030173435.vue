<template>
    <div>
        <Header/>
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
            :isShowSpeed="false"
        />
        <ul>
            <li v-for="task of completeds" :key="task.gid" >
                <span>{{getFilename(task)}} / 100%</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions} from 'vuex'
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
        ...mapState(['completeds'])
    },
    methods: {
        ...mapActions(['getCompletedName']),

        getFilename (task) {
            return task.files[0].path.split('/').at(-1)
        },
    }
}
</script>