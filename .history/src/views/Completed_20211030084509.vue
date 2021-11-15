<template>
    <div>
        <h3 >已完成</h3>
        <ul>
            <li v-for="task of $store.state.completeds" :key="task.gid" >
                <span>{{getFilename(task)}} / 100%</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions} from 'vuex'
export default {
    name:'completed',
    data() {
        return {}
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
    methods: {
        ...mapActions(['getCompletedName']),

        getFilename (task) {
            return task.files[0].path.split('/').at(-1)
        },
    }
}
</script>