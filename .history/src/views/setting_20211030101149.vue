<template>
    <div>
        <Settings name=""  />
    </div>
</template>
<script>
import Settings from 'Settings.vue'

export default {
    // 看当前的
    components : {
        Settings,
    },
    mounted() {
        console.log(this.$route.params.type)
    }
}
</script>