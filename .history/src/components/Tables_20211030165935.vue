<style scoped lang="less"> 
    .downloading {
        margin: 20px 30px 0 30px;
        .classify {
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
        <div class="classify">
            <span>文件名</span>
            <span>大小</span>
            <span>进度</span>
            <span>速度</span>
            <span>详情</span>
        </div>
        <div> 
            <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
            <span class="filename">{{ filename }}</span>
            <span class="filesize">{{ filesize }}</span>
            <el-progress :percentage="getProgress(task)" ></el-progress>
            <span class="filespeed">{{ getDownloadSpeed(task) }}</span>
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
    }
}
</script>