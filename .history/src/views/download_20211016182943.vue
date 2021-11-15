<template>
    <div>
        <router-link to="/downloading">正在下载</router-link>
        <router-link to="/completed">已完成</router-link>
        <router-link to="/deleted">已删除</router-link>
    </div>
    <router-view :aria2='aria2'></router-view>
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