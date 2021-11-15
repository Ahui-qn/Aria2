<style scoped lang="less"> 
    .downloading {
        margin: 20px 30px 0 30px;
        .edit-status {
            button{
                margin-right:5px ;
            }
        }

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
            <el-progress :percentage="progress" ></el-progress>
            <span class="filespeed">{{speed}}</span>
            <router-link class="filedetails" :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'Table',
    props: {
        isSpeed: {
            type: Boolean,
            required: false
        },
        speed: {
            type: String,
            required: false
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