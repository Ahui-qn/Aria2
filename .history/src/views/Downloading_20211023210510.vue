<style scoped lang="less"> 
    .downloading {
        margin-top: 20px;
        margin-left: 50px;
        .classify {
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
        ul {
            padding-left:0 ;
            li.task {
                list-style: none;
                width: 100%;
                height: 60px;
                border-bottom: 1px solid red;
                line-height: 60px;
                position: relative;
                .el-progress {
                    width: 50px;
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
        <ul>
           <label> 
                <li v-for="(task) of showSearch" class="task" :key="task.gid"  @click="selectedSwitch(task)"> 
                    <input type="checkbox" :checked="selected.includes(task.gid)">  <!-- checked状态由selected有没有这个任务决定-->
                    <span class="filename">{{ getLinkName(task) }}</span>
                    <span class="filesize">{{ getFileSize(task) }}</span>
                    <span class="fileprogress">{{ getProgress(task) }}</span>
                    <span><el-progress :percentage="getProgress(task)" ></el-progress></span>
                    <span class="filespeed">{{ getDownloadSpeed(task) }}</span>
                    <router-link class="filedetails" :to="{name:'TaskDetails', params: {gid: task.gid}}">详情</router-link>
                </li>
            </label>
        </ul>
    </div>
</template> 

<script>
import { mapState , mapMutations, mapGetters,  mapActions} from "vuex"
export default {
    name:'downloading',
    data() {
        return {}
    },
    mounted() {
        this.$store.dispatch('asyncUpdateList')
        this.IntervalId = setInterval(() => {
            this.$store.dispatch('asyncUpdateList')
        },1000)
    },

    beforeDestroy() {
        clearInterval(this.IntervalId)
    },
    computed : { 
        ...mapState(['search','tasks','selected']),

        ...mapGetters([
            'showSearch',
            'getLinkName',
            'getProgress',
            'getDownloadSpeed',
            'getFileSize'
            ]),
    },
    methods :{
        ...mapActions(['editStatus']),
        ...mapMutations([   // 函数作用注释在store里
            'selectedSwitch',
            'selectAll',
            'updateList',
            'handleSearchChange',
            ]),
    },
}
</script>
