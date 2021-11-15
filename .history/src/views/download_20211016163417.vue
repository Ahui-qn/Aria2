<template>
    <div>
        <router-link to="/downloading">正在下载</router-link>
        <router-link to="/completed">已完成</router-link>
        <router-link to="/deleted">已删除</router-link>
        <router-view></router-view>
    </div>

</template>
<script>
export default {
}
</script>