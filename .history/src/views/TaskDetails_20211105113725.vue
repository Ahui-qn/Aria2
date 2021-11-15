<template>
    <div>
      <!-- 可以用组件把总览和区块信息做成标签页，无需路由 -->
        <h4>任务详情</h4>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="信息总览" name="infoAbout">
            <ul>
                <li>任务名称 : {{getLinkName(task)}}</li>
                <li>任务大小 : {{getFileSize(task)}}</li>
                <li>任务状态 : {{getStatus(task)}}</li>
                <li>任务进度 : {{getProgress(task)}}</li>
                <li>已下载 : {{getHaveDownloaded(task)}}</li>
                <li>下载链接 : {{getDownloadLink(task)}}</li>
                <li>存储路径 : {{task.dir}}</li>
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
        <hr>
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
       getFineName(val) {
           console.log(val)
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
    div.container{
        width: 50vw;
        height: 100vh;
        .unfinished{
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: rgb(176, 176, 176);
            margin: 2px;
            &.completed {
                background-color:rgb(56, 255, 86);
            }
        }
    }
</style>