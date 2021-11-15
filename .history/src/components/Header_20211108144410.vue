<style scoped lang="less">
    .classify {
        margin: 20px 20px 0 20px;
        padding-bottom: 10px;
        font-size: 16px;
        position: relative;
        height: 30px;
        border-bottom: 1px rgba(198, 198, 198, 0.715) solid;
        div.container {
            position: absolute;
            top: 0;
            left: 40%;
            display: flex;
            width: 200px;
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
                <div @click="handlerSort()">
                    <span >大小</span>
                    <i class="el-icon-caret-top"></i>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <div @click="progressSort()">
                    <span >进度</span>
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
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'Header',
    path: '',
    sort: true,
    props: {
        isShowSpeed: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    watch: {
        $route : {
            handler() {
                let currentParams = this.$route.path
                if (currentParams == '/completeds') {
                    this.path = "/completeds"
                }else if (currentParams == '/deleted') {
                    this.path = '/deleted'
                }else {
                    this.path = '/'
                }
            }
        }
    },
    methods : {
        ...mapMutations(['sizeSort', 'progressSort']),
        handlerSort() {
            if (this.path == '/completeds') {
                let sizeSortArray = this.methods.quickSort(this.completeds)
            }else if (this.path == '/deleted') {
                let sizeSortArray = this.methods.quickSort(this.discard)
                console.log(sizeSortArray)
            }else {
                let sizeSortArray = this.quickSort(this.tasks)
            }
        },
        quickSort(arr) {   // 快排小到大
            if (arr.length <= 1) {
                return arr
            }
            let pivotIndex = Math.floor(arr.length / 2)
            let pivot = arr.splice(pivotIndex, 1)[0]
            let left = []
            let right = []
            for (let i = 0; i < arr.length; i++) {
                if (this.sort == true) {  
                    if (Number(arr[i].totalLength) < Number(pivot.totalLength)) {
                        left.push(arr[i])
                    } else {
                        right.push(arr[i])
                    }
                }else {
                    if (Number(arr[i].totalLength) > Number(pivot.totalLength)) {
                        left.push(arr[i])
                    } else {
                        right.push(arr[i])
                    }
                }
            }
            // 递归
            return quickSort(left).concat([pivot], quickSort(right))
        },
    },
    computed : {
        ...mapState(['tasks', 'completeds', 'discard']),
        path() {
            return this.$route.path
        }
    },
}
</script>