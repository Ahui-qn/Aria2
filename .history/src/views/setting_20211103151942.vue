<template>
    <div>
        <Settings  @change="editSetting()"/>
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
    // 将分类好类的四个设置对象分别保存在data四个字段
    // 分别给不同的route传递不同四个对象，再把翻译也传过去
    // 子组件修改了参数，就给父组件提交接口来更新设置，editSetting接收传来的设置项参数，然后传给changeGlobaOption去修改
    // 直接把传来的设置参数传给changeglobalOptions即可修改
}
</script>