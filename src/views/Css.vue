<template>
    <div class="frosted-container" ref="container">
        <div
                v-for="(ball, idx) in balls"
                :key="idx"
                class="frosted-ball"
                :class="{ active: activeIndex === idx }"
                :style="ballStyle(ball, idx)"
                @mouseenter="onBallEnter(idx)"
                @mouseleave="onBallLeave"
        ></div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const BALL_SIZE = 60
const BALL_MARGIN = 2
const ROWS = 6
const COLS = 10

// 生成球的初始位置
const balls = reactive([])
for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        balls.push({
            left: col * (BALL_SIZE + BALL_MARGIN) + Math.random() * 8,
            top: row * (BALL_SIZE + BALL_MARGIN) + Math.random() * 8,
        })
    }
}

const activeIndex = ref(null)
let hoverTimer = null

function onBallEnter(idx) {
    if (activeIndex.value !== null) return
    hoverTimer = setTimeout(() => {
        activeIndex.value = idx
    }, 1000)
}
function onBallLeave() {
    clearTimeout(hoverTimer)
}

function ballStyle(ball, idx) {
    if (activeIndex.value === idx) {
        return {
            left: '50%',
            top: '50%',
            width: '160px',
            height: '160px',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
        }
    }
    return {
        left: ball.left + 'px',
        top: ball.top + 'px',
        width: BALL_SIZE + 'px',
        height: BALL_SIZE + 'px',
        transform: 'none',
        zIndex: 1,
    }
}

// 点击容器空白处恢复
const container = ref(null)
function onContainerClick(e) {
    // 只在点击容器本身时恢复
    if (e.target === container.value) {
        activeIndex.value = null
    }
}
container.value && container.value.addEventListener('click', onContainerClick)
</script>

<style scoped>
body {
    background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    min-height: 100vh;
    margin: 0;
    overflow: hidden;
}

.frosted-container {
    position: absolute;
    top: 50px;
    left: 50px;
    right: 50px;
    bottom: 50px;
    background: rgba(255,255,255,0.3);
    border-radius: 30px;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    overflow: hidden;
}

.frosted-ball {
    position: absolute;
    border-radius: 50%;
    border: 2.5px solid rgba(255,255,255,0.8);
    background: transparent;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.15);
    transition:
            left 0.8s cubic-bezier(.4,2,.6,1),
            top 0.8s cubic-bezier(.4,2,.6,1),
            width 0.8s,
            height 0.8s,
            z-index 0s,
            transform 0.8s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
}

.frosted-ball.active {
    /* 放大时样式已在style绑定 */
}
</style>

