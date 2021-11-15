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
        translation: String,
        param: Array,  // 
    },
    mounted () {
        console.log(this.$route.params.type)
    }
}
/*  传递过来一个设置对象和翻译对象，一共两个对象，将英文key的那个对象保存在parameter里
    如果修改了parameter就触发emit事件把parameter传给给父组件去修改设置项，此页面主要用到父子组件沟通，没有vuex
    
*/ 
</script>