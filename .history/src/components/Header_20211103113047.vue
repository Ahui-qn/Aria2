<style scoped lang="less">
    .classify {
        margin: 20px;
        font-size: 16px;
        position: relative;
        height: 30px;
        border-bottom: 1px rgba(198, 198, 198, 0.715) solid;
        div.container {
            float: right;
            position: absolute;
            top: 0;
            left: 20px;
            display: flex;
            width: 280px;
            justify-content: space-between;
            div {
                position: relative;
                i {
                    position: absolute;
                    font-size: 12px;
                    color: rgb(94, 94, 94);
                }
                i:nth-of-type(1) {
                    top: 3px;
                }
                i:nth-of-type(2) {
                    top: 9px;
                }
            }
        }
}
</style>
<template>
    <div>
        <header class="classify">
            <span>文件名</span>
            <div class="container">
                <p>排序</p>
                <div>
                    <span>大小</span>
                    <i class="el-icon-caret-top"></i>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <div>
                    <span>进度</span>
                    <i class="el-icon-caret-top"></i>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <div v-show="isShowSpeed">
                    <span>速度</span>
                     <i class="el-icon-caret-top"></i>
                     <i class="el-icon-caret-bottom"></i>
                </div>
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