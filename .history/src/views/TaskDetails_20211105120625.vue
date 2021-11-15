<template>
    <div class="TaskDetails">
      <!-- 可以用组件把总览和区块信息做成标签页，无需路由 -->
        <el-tabs v-model="activeName" >
            <el-tab-pane  label="信息总览" name="infoAbout">
            <ul>
                <li>
                    任务名称
                    <span> {{getLinkName(task)}}</span>
                </li>
                <li>
                    任务大小
                    <span> {{getFileSize(task)}}</span>
                </li>
                <li>
                    任务状态
                    <span> {{getStatus(task)}}</span>
                </li>
                <li>
                    任务进度
                    <span> {{getProgress(task)}}</span>
                </li>
                <li>
                    已下载
                    <span> {{getHaveDownloaded(task)}}</span>
                </li>
                <li>
                    下载链接
                    <span> {{getDownloadLink(task)}}</span>
                </li>
                <li>
                    存储路径
                    <span> {{task.dir}}</span>
                </li>
            </ul>
            </el-tab-pane>
            <el-tab-pane label="区块信息" name="blockInfo">
                <div class="container">
                    <span v-for="(i, idx) of bitfield" 
                    :key="idx" 
                    class="unfinished" 
                    :class="{completed: bitfield[i - 1] == '1'}">
                    </span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文件列表" name="fileList">
                <div v-for="val of task.files" :key="val.index">
                    <span>{{getFileName(val)}}</span>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="fullScreen"></div>
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
        ...mapState(['aria2'])
    },
    methods: {
        getFileName(val) {
            return  val.uris?.[0].uri.split('/').at(-1) ?? '未知'
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
        this.bitfield = this.task.bitfield.split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('').split('')
    },

}
</script>
<style lang="less" scoped>
.TaskDetails {
    margin: 20px  20px;
    position: relative;
    ul {
        li{
            border-bottom: 1px solid #eee;
            height: 50px;
            line-height :50px ;
            span {
                float: right;
            }
        }
    }
    .fullScreen {
        position:absolute;
        top: 38px;
        left:-30px;
        height: 2px;
        width: 100vw;
        background-color: #e4e7ec;
    }
    /deep/ .el-tabs__item {
        font-size: 16px;
    }
    div.container{
        width: 50vw;
        height: 83vh;
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
}
</style>