<template>
    <div>
        <Header/>
        
        <ul>
            <li v-for="task of completeds" :key="task.gid" >
                <span>{{getFilename(task)}} / 100%</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions} from 'vuex'
import Tasbles from '../components/Tables.vue'
import Header from '../components/Header.vue'
export default {
    name:'completed',
    data() {
        return {}
    },
    components: {
        Tasbles,
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