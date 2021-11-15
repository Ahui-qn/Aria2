<style lang="less" scoped>
.TaskDetails {
    margin: 20px  0px;
    position: relative;
    ul {
        li{
            border-bottom: 1px solid #eee;
            font-size: 14px;
            padding: 0 60px 0 25px;
            height: 50px;
            line-height :50px ;
            position: relative;
            letter-spacing: 0.5px;
            strong {
                position: absolute;
                left: 500px;
            }
        }
    }
    .flin-name {
        padding: 0 25px;
        position: relative;
        border-bottom: 1px #eee solid;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        span {
            letter-spacing :1px
        }
        strong {
            position: absolute;
            left: 700px;
        }
    }    
    /deep/ .el-tabs__item {
        font-size: 16px;
    }
    /deep/ .el-tabs__nav-scroll {
        padding: 0 25px;
    }
     .blockInfo {
        position: relative;
        div.container{
            width: 50vw;
            height: 83vh;
            margin-left: 25px;
            .unfinished{
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: rgb(176, 176, 176);
                margin: 2px;
                &.completed {
                    background-color:rgb(56, 255, 86);
                }
            }
        }
        .comments-container {
            position: absolute;
            top: 2px;
            left: 65%;
            font-size: 14px;
            .green, .gray {
                span {
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    margin-right: 10px;
                }
            }
            .green {
                span {
                    background-color: #37fe56;
                }
            }
            .gray {
                left: 75%;
                span {
                    background-color: rgb(172, 172, 172);
                }
            }
        }
    }
   
}
</style>
<template>
    <div class="TaskDetails">
      <!-- 可以用组件把总览和区块信息做成标签页，无需路由 -->
        <el-tabs v-model="activeName" >
            <el-tab-pane  label="信息总览" name="infoAbout">
            <ul>
                <li>
                    任务名称
                    <strong> {{getLinkName(task)}}</strong>
                </li>
                <li>
                    任务大小
                    <strong> {{getFileSize(task)}}</strong>
                </li>
                <li>
                    任务状态
                    <strong> {{getStatus(task)}}</strong>
                </li>
                <li>
                    任务进度
                    <strong> {{getProgress(task)}}</strong>
                </li>
                <li>
                    已下载
                    <strong> {{getHaveDownloaded(task)}}</strong>
                </li>
                <li v-if="bittorrent">  <!--如果是种子文件就没有下载链接-->
                    下载链接
                    <strong> {{getDownloadLink(task)}}</strong>
                </li>
                <li>
                    存储路径
                    <strong> {{task.dir}}</strong>
                </li>
            </ul>
            </el-tab-pane>
            <!-- 区块信息 -->
            <el-tab-pane label="区块信息" class="blockInfo" name="blockInfo">
                <div class="container">
                    <span v-for="(i, idx) of bitfield" 
                    :key="idx" 
                    class="unfinished" 
                    :class="{completed: bitfield[i - 1] == '1'}">
                    </span>
                </div>
                <div class="comments-container">
                    <div class="green">
                        <span ></span>
                        <strong>已完成</strong>
                    </div>
                    <div  class="gray">
                        <span></span>
                        <strong>未完成</strong>
                    </div>
                </div>
            </el-tab-pane>
            <!-- 文件列表 -->

            <el-tab-pane label="文件列表" name="fileList">
                <div class="flin-name" v-for="val of task.files" :key="val.index">
                    <span>{{getFileName(val)}}</span>
                    <strong>{{getFileSize(task)}}</strong>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
    name: 'TaskDetails',
    data() {
        return {
            activeName : 'infoAbout',
            task : [],  // 一个任务的status
            bitfield : []  //存放已下载的bit
        }
    },
    computed : {
        ...mapGetters(['getLinkName', 'getFileSize']),
        ...mapState(['aria2']),
        bittorrent() {   // 如果是种子文件的话
            if (this.task.bittorrent) {
                return true
            }else {
                return false
            }
        }
    },
    methods: {
        getFileName(val) {
            if(this.bittorrent) {
                return val.path.split('/').at(-1)
            }else {
                return  val.uris?.[0].uri.split('/').at(-1) ?? '未知'
            }
        },
        getProgress(task) {
            if (task.completedLength == '0') {
                return 0
            }else {
                return (task.completedLength / task.totalLength * 100).toFixed(2) + '%'
            }
        },
        getHaveDownloaded(task) {
            if (task.completedLength  > 1048576) {
                return (task.completedLength / 1024 / 1024).toFixed(2) + 'MB'
            }else {
                return (task.completedLength / 1024).toFixed(2) + 'KB'
            }
        },
        getStatus(task) {
            if (task.status == 'paused') {
                return '暂停中'
            }else if (task.status == 'active') {
                return '下载中'
            }else {
                return '等待中'
            }
        },
        getDownloadLink(task) {
           return task.files?.[0].uris[0].uri
        },
    },
    async mounted() {  // 获取一次即可，多次获取由于需要重新渲染span ,巨消耗性能
        this.task = await this.aria2.tellStatus(this.$route.params.gid)
        console.log(this.task)
        this.bitfield = this.task.bitfield.split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('').split('')
    },

}
</script>
