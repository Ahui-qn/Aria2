<style scoped lang="less">
    .classify {
        margin: 20px;
        font-size: 16px;
        position: relative;
        height: 30px;
        border-bottom: 1px rgba(198, 198, 198, 0.715) solid;
        span {
            position: absolute;
        }
        :nth-of-type(2) {
            left: 40%;
        }
        :nth-of-type(3) {
            left: 50%;
        }
        :nth-of-type(4) {
            left: 80%;
        }
        :nth-of-type(5) {
            left: 90%;
        }
}
</style>
<template>
    <div>
        <header class="classify">
            <span>文件名</span>
            <span>大小</span>
            <span>进度</span>
            <span>速度</span>
            <span>详情</span>
        </header>
    </div>
</template>
<script>
export default {
    
}
</script>