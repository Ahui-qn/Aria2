<template>
    <div>
        <h3>已完成</h3>
        <ul>
            <li v-for="(task,idx) of completeds" :key="idx">
                <span>{{getFilename(task)}} / 100%</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'completed',
    props: ['aria2'],
    data() {
        return {
            completeds: []
        }
    },
    mounted() {
        this.getCompletedName()
        this.intervalId = setInterval(() => {
            this.getCompletedName()
        },1000)
    },
    beforeDestroy() {
        clearInterval(this.IntervalId)
    },
    methods: {
        async getCompletedName() {
            this.completeds = [
                ...await this.aria2.tellStopped(0,1000)
            ]
        },
        getFilename (task) {
            return task.files[0].path.split('/').at(-1)
        }
    }
}
</script>