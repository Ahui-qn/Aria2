<template>
    <div>
        <router-link to="/downloading" :exact="true">正在下载</router-link>
        <router-link to="/completed">已完成</router-link>
        <router-link to="/deleted">已删除</router-link>
        <router-view :aria2='aria2'></router-view>
    </div>
</template>

<script>
export default {
    name: 'download',
    props: ['aria2'],
    data() {
        return {}
    }
}
</script>