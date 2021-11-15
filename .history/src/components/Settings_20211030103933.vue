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
            parameter: null,    // 需要修改的数据保存在这以来触发响应式更新
        }
    },
    props: {
        translation: String,
        param: Array,  // 
        /*
            [
                {
                    name: 'all-proxy'
                    translation: '代理服务器'


                }
            ]
        */ 
    }

}
/*  传递过来一个设置对象和翻译对象，一共两个对象
    将对象保存在data里，如果修改了，data就响应式
*/ 
</script>