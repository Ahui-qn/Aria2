<style lang='less' scoped>
    div.newTask {
        margin: 20px 30px 0 30px;
    }
</style>

<template>
    <div class="newTask">
        <h4>新建链接</h4>
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
