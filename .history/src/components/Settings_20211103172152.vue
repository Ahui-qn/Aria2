<template>
    <div>
        aaaa
    </div>
</template>

<script>
export default {
    name:"Setting",
    data () {
        return {
            parameter: null,    // 需要修改的数据保存在这以来触发 响应式更新
        }
    },
    props: {
        param: Object,  // 
    },
    mounted () {
    }
}
/*  传递过来一个设置对象，然后将其翻译
    如果修改了parameter就触发emit事件把parameter传给给父组件去修改设置项，此页面主要用到父子组件沟通，没有vuex
    
*/ 
</script>