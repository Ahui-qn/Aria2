<style scoped lang="less"> 
    .downloading {
        margin: 15px 20px 15px 20px;
        height: 60px;
        padding:5px;
        border-radius: 10px;
        box-shadow:0px 0px 5px 0px #00000024;
        line-height:30px;
        background-color: #f7f7f7;
        div.task {
            position: relative;
            .el-progerss {
              /deep/  .el-progerss-bar_outer {
                    background-color: #d6d6d6;
                }
            }
            span {
                position: absolute;
            } 
            .filesize {
                left: 40%;
            }
            .fileprogress {
                left: 50%;
            }
            .filespeed {
                left: 80%;
            }
            .filedetails {
                position: absolute;
                left: 90%;
            }
        }
    }
</style>

<template>
    <div class="downloading">
        <div class="task"> 
            <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
            <span class="filename">{{ filename }}</span>
            <span class="filesize">{{ filesize }}</span>    
            <span v-if="isShowSpeed" class="filespeed">{{speed}}</span>
            <router-link class="filedetails" :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
            <el-progress  :percentage="progress" ></el-progress>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'Tables',
    props: {
        isShowSpeed: {
            type: Boolean,
            required: false,
            default: true
        },
        speed: {
            type: String,
            required: false
        },
        task: {
            type: Object,
            required: true
        },
        progress: {
            type: Number,
            required: false
        },
        filename: {
            type: String,
            required: true
        },
        filesize: {
            type: String,
            required: true
        },
        selected: {
            type: Array,
            required: true
        },
    }
}
</script>