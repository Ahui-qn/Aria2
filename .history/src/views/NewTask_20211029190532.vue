<style lang='less' scoped>
    div.newTask {
        margin:20px 20px 0 20px;
        textarea {
            width: 100%;
            height: 300px;
            padding: 10px;
        }
        .downloadType{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width:450px;
            font-size: 14px;
            color: white;
            span {
                display: inline-block;
                height: 50px;
                width: 80px;
                border-radius: 10px 10px 0 0 ;
                background-color: rgb(76, 159, 247);
                text-align: center;
                line-height: 50px;
                font-size: 15px;
                position: relative;
            }
            span::after {
                content: '';
                position: absolute;
                top: 8px;
                right: -30px;
                width: 1px;
                height: 35px;
                background-color: rgb(210, 210, 210);
            }
            .bt ,.metalink{
                display: inline-block;
                border-radius: 999px;
                height: 30px;
                width: 150px;
                background-color: #6195f5;
                text-align: center;
                line-height: 30px;
            }
            .bt {
                margin-left:50px;
                width: 100px;
            }
        }
    }
</style>

<template>
    <div class="newTask">
        <div class="downloadType">
            <span>下载链接</span>
            <label for="" class="bt">选择BT种子</label>
            <input type="file"  hidden>
            <label for="" class="metalink">选择Metalink文件</label>
            <input type="file" hidden>
            <button @click="submit">确定</button>
        </div>
        <textarea v-model="url" placeholder="请粘贴URL下载连接到此处: "  name="" id="" cols="50" rows="10">
        </textarea>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            url: null,
            aria2 : aria2
        }
    },
    mounted () {
        console.log(this.aria2)
    },
    methods : {
        ...mapState(['aria2']),
         async submit() {
            await this.aria2.addUri([this.url])
       },
    }
}
</script>
