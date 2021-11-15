<template>
    <div>
        <Settings name=""  />
    </div>
</template>
<script>
import Settings from 'Settings.vue'

export default {
    name: 'Setting',
    components : {
        Settings,
    },
    mounted() {
        console.log(this.$route.params.type)
    }
}
</script>