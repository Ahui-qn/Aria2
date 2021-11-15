<style scoped lang="less">
    .classify {
        margin: 20px;
        font-size: 16px;
        position: relative;
        height: 30px;
        border-bottom: 1px rgba(198, 198, 198, 0.715) solid;
        div {
            float: right;
            margin-right:10px ;
            display: flex;
            justify-content: space-between;
        }
}
</style>
<template>
    <div>
        <header class="classify">
            <span>文件名</span>
            <div>
                <span>大小</span>
                <span>进度</span>
                <span v-show="isShowSpeed">速度</span>
                <span>详情</span>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    name: 'Header',
    props: {
        isShowSpeed: {
            type: Boolean,
            required: false,
            default: true
        }
    }
}
</script>