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
            width:520px;
            font-size: 14px;
            margin-left: 14px;
            color: white;
            > span {
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
            > span::after {
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
                cursor: pointer;
            }
            .bt {
                margin-left:42px;
                width: 100px;
            }
            
            .submit {
                width: 77px;
                height: 30px;
                margin-left: 20px;
                background-color: #41b541;
                border-radius: 5px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
        }
    }
</style>

<template>
    <div class="newTask">
        <div class="downloadType">
            <span>下载链接</span>
            <label for="bt" class="bt" >选择BT种子</label>
            <input type="file"  hidden  multiple id="bt" @change="addTorrent">
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="handleClose">


                <div class="filelist" v-for="info of btInfo" :key="info.length + Math.random()">{{info.name}}</div>


                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary"  @click="startBtDownload">确 定</el-button>
                </span>
            </el-dialog>
            <label for="matalink" class="metalink">选择Metalink文件</label>
            <input type="file" multiple hidden id="matalink">
            <div class="submit" @click="submit">立即下载</div>
        </div>
        <textarea v-model="urls" placeholder="请粘贴URL下载连接到此处，支持多个链接，以回车分隔 : "  name="" id="" cols="50" rows="10">
        </textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import parseTorrent from 'parse-torrent'  // 解析种子文件信息

function getFileContent(file) {   // 读取文件的base64
    return new Promise((resolve, reject) => {
        var fr = new FileReader()
        fr.onload = function () {
            var commaPos = fr.result.indexOf(',')
            resolve(fr.result.slice(commaPos + 1))
        }
        fr.onerror = reject
        fr.readAsDataURL(file)
    })
}
export default {
    data() {
        return {
            urls: null,
            type: 'url',
            btInfo: null,
            dialogVisible: false,
            btBase64: null,   // 需要发送给服务器的信息
        }
    },
    computed: {
        ...mapState(['aria2']),
    },
    methods : {
        async addTorrent(e) {
            var file = e.target.files[0]
            var btFileBase64 = await getFileContent(file)
            var btFileBuffer = Buffer.from(btFileBase64, 'base64')
            var parsedTorrent = parseTorrent(btFileBuffer)   // 
            console.log(btFileBase64)

            this.dialogVisible = true
            this.btBase64 = btFileBase64
            console.log(parsedTorrent)
            this.btInfo = parsedTorrent.files
            this.type = 'bt'
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        async startBtDownload() {
            this.dialogVisible = false
            await this.aria2.addTorrent(this.btBase64)
            this.$router.push('/')
        },
        async submit() {
            let splitUrls = this.urls.split('\n')
            console.log(urls)
            for (let url of splitUrls) {
                await this.aria2.addUri([url])
            }
            this.$router.push('/')
        },
    }
}
</script>
