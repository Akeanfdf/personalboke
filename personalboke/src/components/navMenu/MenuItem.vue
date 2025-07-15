<template>
    <h3 style="float: left">CyGames</h3>
    <el-menu
        class="el-menu-demo el-right"
        background-color="transparent"
        text-color="color: #1a1a1a "
        active-text-color="#1890ff"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
    >
        <el-menu-item index="/Title">首页</el-menu-item>
        <el-sub-menu>
            <template #title>页面合集</template>
            <el-menu-item index="/About">创意风格1</el-menu-item>
            <el-menu-item index="2-2">创意风格2</el-menu-item>
            <el-menu-item index="2-3">创意风格3</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">杂谈</el-menu-item>
        <el-menu-item index="/Website">网站合集</el-menu-item>
        <el-menu-item index="Css">CSS合集</el-menu-item>
    </el-menu>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
<style>
.el-menu-demo{opacity: 0.9; }
.el-right{float:right;}
:root {
    --el-bg-color-overlay: rgba(255, 255, 255, 0); /* 设为你想要的透明背景 */
    --el-border-color-light: transparent; /* 设为透明或其他颜色 */
}

</style>