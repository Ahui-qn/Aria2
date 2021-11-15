<template>
    <div>
        <Settings/>
    </div>
</template>

<script>
import Settings from '../components/Settings.vue'

export default {
    name: 'Setting',
    components : {
        Settings,
    },
    mounted() {
        console.log(this.$route.params.type)
    }
    // 当此页面为某个type的时候就传此页面的设置参数项
}
</script>