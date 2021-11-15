<template>
    <div id="app">
        <div class="nav">
            <p >
                <router-link to="/" >正在下载</router-link>
            </p>
            <p>
                <router-link to="/completed">已完成</router-link>
            </p>
            <p>
                <router-link to="/new">新建下载</router-link>
            </p>
            <p>
                <router-link to="/basicSettings">基本设置</router-link>
            </p>
             <p>
                <router-link to="/new">高级设置</router-link>
            </p>
        </div>
        <router-view :aria2="aria2"></router-view>
    </div>
</template>

<script>
import Aria2Client from './aria2-client.js'

export default {
    name: 'App',
    data() {
        return {
            aria2 : new Aria2Client({
                host: 'localhost',
                port: 6800,
                secret: '123456',
        })
        }
    },
    methods: {
        
    },
    mounted() {
    }
}
</script>

<style lang="less">

    #app {
        display: flex;
        margin-top:0;
        .nav {
            width: 100px;
            height: 100vh;
            border-right: 1px solid red;
        } 

    }
</style>
