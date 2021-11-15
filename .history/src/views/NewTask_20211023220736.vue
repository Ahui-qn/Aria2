<style lang='less' scoped>
    div.newTask {
        margin:20px 20px 0 20px;
        textarea {
            width: 100%;
            height: 300px;
        }
        .downloadType{
            display: flex;
            justify-content: space-between;
            width:370px;
            font-size: 14px;
            span {
                display: inline-block;
                height: 50px;
                width: 80px;
                border-radius: 5px 5px 0 0 ;
                background-color: rgb(76, 159, 247);
                color: white;
                text-align: center;
                line-height: 50px;
            }
            .bt ,.metalink{
                display: inline-block;
                border-radius: 999px;
                height: 30px;
                width: 150px;
                background-color: turquoise;
                text-align: center;
                line-height: 30px;
            }
            .bt {
                margin-left:20px;
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
        </div>
        <textarea v-model="url"  name="" id="" cols="50" rows="10">
        </textarea>
        <button @click="submit">确定</button>
    </div>
</template>
<script>
export default {
    props: ['aria2'],
    data() {
        return {
            url: null
        }
    },
    methods : {
       async submit() {
            await this.aria2.addUri([this.url])
            this.$router.push('/')
        }
    }
}
</script>
