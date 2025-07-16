<template>
    <div class="wallpaper-container">
        <video
                autoplay
                loop
                muted
                playsinline
                class="bg-video"
                src="@/camera/鲸落最终版%20动态水印.mp4"
        ></video>
        <div class="content">
            <P style="font-size: 24px;color: #f3f3f3;margin-top: 15px;margin-left: 300px" ><Time/></P>
            <p style="font-size: 24px;color: #f3f3f3;margin-left: 20px;margin-top: 30vh">暮秋浅冬，愿尘世安康</p>
            <p style="font-size: 24px;color: #f3f3f3;margin-left: 20px;">
                桜の花びらに、願いを託す</p>
        </div>
    </div>
    <div
        class="music-float"
        @mouseenter="showPlayer = true"
        @mouseleave="showPlayer = false"
    >
        <div class="music-arrow" v-if="!showPlayer"><img src="D:\vue project\personalboke\personalboke\src\camera\喝茶.svg" ></div>
        <transition name="slide-music">
            <div class="music-container" v-show="showPlayer">
                <MusicPlayer />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.wallpaper-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.bg-video {
    position: absolute;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 0;
}
.content {
    position: relative;
    z-index: 1;
    width:50%;height:100%;
    background-color: rgba(51, 51, 51, 0.5);
    overflow: hidden;
    clip-path: polygon(0% 0%, 70% 0%, 100% 100%,0% 100%);
    /* 这里放你的内容样式 */
}
.music-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    pointer-events: auto;
}
.music-float {
     position: fixed;
     bottom: 20px;
     right: 20px;
     z-index: 9999;
     display: flex;
     align-items: center;
     height: 120px;
 }
.music-arrow {
    width: 20px;
    height: 20px;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
}
.music-arrow:hover {
    background: #764ba2;
}
.music-container {
    /* 你播放器的宽度 */
    width: 380px;
    transition: box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
}
.slide-music-enter-active,
.slide-music-leave-active {
    transition: all 0.3s cubic-bezier(.55,0,.1,1);
}
.slide-music-enter-from,
.slide-music-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
.slide-music-enter-to,
.slide-music-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>
<script setup>
import MusicPlayer from '@/components/music/music.vue'
import Time from "@/components/Time/Time.vue"
import { ref } from 'vue'
const showPlayer = ref(false)
</script>