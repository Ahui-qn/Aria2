<style lang='less' scoped>
    div.newTask {
        margin:31px 20px 0 20px;
        textarea {
            width: 100%;
            height: 300px;
            padding: 10px;
        }
        textarea {
            border-radius: 10px;
            font-family: Arial, Helvetica, sans-serif;
            background-color: rgb(249, 249, 249);
            border: 2px solid rgb(88, 191, 255);
            resize: none;
            outline-color:  rgb(88, 191, 255); 
        }
        .downloadType{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width:450px;
            font-size: 14px;
            margin-left: 14px;
            color: white;
            span {
                display: inline-block;
                height: 50px;
                width: 80px;
                border-radius: 10px 10px 0 0 ;
                background-color: #217bdb;
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
                background-color: #4587ff;
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
            <label for="bt" class="bt">选择BT种子</label>
            <input type="file"  hidden id="bt">
            <label for="matalink" class="metalink">选择Metalink文件</label>
            <input type="file" hidden id="matalink">
            <button @click="submit(url)">确定</button>
        </div>
        <textarea v-model="url" placeholder="请粘贴URL下载连接到此处，支持多个链接，以回车分隔 : "  name="" id="" cols="50" rows="10">
        </textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            url: null
        }
    },
    computed: {
        ...mapState(['aria2']),
    },
    methods : {
         async submit(url) {
            let urls = url.split('\n')
            console.log(urls)
            for (let url of urls) {
                await this.aria2.addUri([url])
            }
            this.$router.push('/')
        },
    }
}
</script>
