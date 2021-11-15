<style scoped lang="less"> 
    .downloading {
        margin: 15px 20px 15px 20px;
        height: 63px;
        padding:5px 10px 5px 10px ;
        border-radius: 10px;
        box-shadow:0px 0px 5px 0px #00000024;
        line-height:25px;
        background-color: #f7f7f7;
        div.task {
            position: relative;
            span {
                position: absolute;
            } 
            .el-progress {
                margin: 1px 0 0 30px;
                font-size: 10px;
               /deep/ .el-progress-bar {
                    width: 100%;
                }
            }
            input {
                margin:14px 13px 0 0 ;
                width: 16px;
                height: 16px;
            } 
            .filename {
                font-size: 14px;
            }
            .filesize {
                font-size: 12px;
                top: 17px;
                left: 30px
            }
            .fileprogress {
                left: 50%;
            }
            .filespeed, .file-active ,.file-waiting{
                font-size: 14px;
                left: 68%;
                padding: 0 5px;
                font-size: 14px;
                top: 8px;
                text-align: center;
                width: 60px;
                border: 1px solid rgb(255, 255, 255);
                color: #353535;
                border-radius: 4px;
            }
            .filespeed {
                background-color:  #fceb66 ;
            }
            .file-active {
                background-color: #9bffc8 ;
                width:auto;
            }
            .file-waiting {
                background-color: #cacaca;
                width:auto;
            }
            .filedetails {
                position: absolute;
                font-size: 14px;
                top: 8px;
                text-align: center;
                width: 50px;
                left: 75%;
                text-decoration: none;
                border: 1px solid white;
                color: #353535;
                border-radius: 4px;
                background-color: #afdaff;
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
            <span v-if="isShowSpeed" :class="transfromClass">{{speed}}</span>
            <router-link class="filedetails" :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
            <el-progress   :percentage="progress" ></el-progress>
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
    },
    computed : {
        transfromClass() {
            if (this.task.status == 'paused') {
                return 'filespeed'
            }else if (this.task.status == 'active'){
                return 'file-active'
            }else {
                return 'file-waiting'
            }
        }
    }
}
</script>