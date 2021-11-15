<style scoped lang="less"> 
    .downloading {
        margin: 20px 30px 0 30px;
        div.task {
            list-style: none;
            width: 100%;
            height: 60px;
            border-bottom: 1px solid rgb(210, 212, 227);
            line-height: 60px;
            position: relative;
            font-size: 14px;
            .el-progress--line {
                display: inline;
                margin-left: 48.5%;
                /deep/ .el-progress-bar {
                    width: 16%;
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
        <div> 
            <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
            <span class="filename">{{ filename }}</span>
            <span class="filesize">{{ filesize }}</span>    
            <span v-if="isShowSpeed" class="filespeed">{{speed}}</span>
            <router-link class="filedetails" :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
            <el-progress :percentage="progress" ></el-progress>
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