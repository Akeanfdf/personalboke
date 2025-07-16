    <template>
        <el-container class="layout-container">
            <el-header>
                <MenuItem></MenuItem>
            </el-header>
            <el-main class="el-main">
                <div class="bg-fullscreen"> <router-view/></div>
                <div class="main-content">
                </div>
            </el-main>
            <el-footer><Footer/></el-footer>
        </el-container>
    </template>

    <script setup lang="ts">
    import MenuItem from "../navMenu/MenuItem.vue";
    import Footer from "../navMenu/Footer.vue";
    </script>

    <style lang="less" scoped>
    .el-main{
        position: relative;
        width: 100vw;
        min-height: 80vh;
        padding: 0;
        overflow: hidden;
    }
    .el-header{z-index: 2}
    .el-footer {
        z-index: 1;
        color: #646cff;
        text-align: center;
        height: 60px; /* 固定高度 */
        line-height: 60px;
    }
    .bg-fullscreen {
        position: fixed; // 或 absolute，如果只想在容器内全屏
        top: 0; left: 0;
        width: 100vw;
        min-height: 80vh;
        z-index: 1;
        pointer-events: none; // 防止视频挡住交互
        overflow: auto;
    }

    .bg-video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: 0;
    }

    .main-content {
        position: relative;
        z-index: 1;
    }

    </style>