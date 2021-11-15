<template>
    <div>
        <Settings />
    </div>
</template>

<script>
import Settings from '../components/Settings.vue'

export default {
    name: 'Setting',
    data() {
        return {
            basic: null,
            http: null,
            rpc: null,
            advanced: null,
        }
    },
    components : {
        Settings,
    },
    mounted() {
        console.log(this.$route.params.type)
    }
    // 将分类好类的四个对象分别保存在data四个字段
    // 当此页面为某个type的时候就传此页面的设置参数项
    // 在此页面将接口返回的对象分好类，分别传递过去，四个对象
}
</script>