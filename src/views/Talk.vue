<template>
    <div class="main mt2">
        <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="8" class="text-center mb-4">
                <div>
                    <div>计时器</div>
                    <div style="font-size: 24px; ">{{ formattedElapsed }}</div>
                </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8" class="text-center mb-4">
                <div>今日幸运时间</div>
                <div style="font-size: 24px; ">{{ dayjs(value1).format('HH:mm:ss') }}</div>
                <el-button class="countdown-footer"  @click="reset">
                    <span>再来一次</span>
                </el-button>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8" class="text-center mb-4">
                <el-countdown format="DD [days] HH:mm:ss" :value="value2">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            <el-icon style="margin-right: 4px" :size="12">
                                <Calendar />
                            </el-icon>
                            距离下一个月
                        </div>
                    </template>
                </el-countdown>
                <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'
import QRCode from 'qrcode'

const elapsed = ref(0) // 秒数
const formattedElapsed = ref('00:00:00')

const value1 = ref(getLuckyTime()) // 当天的未来随机时间
const value2 = ref(dayjs().add(1, 'month').startOf('month'))

let timer: number | null = null
const STORAGE_KEY = 'startTime' // 缓存 key

function getLuckyTime() {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000
    const currentTime = now.getTime()
    const randomTime = currentTime + Math.random() * (endOfDay - currentTime)
    return Math.floor(randomTime)
}

function formatTime(seconds: number) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
}

function reset() {
    value1.value = getLuckyTime()
}

onMounted(() => {
    // 获取或创建开始时间
    let startTime = sessionStorage.getItem(STORAGE_KEY)
    if (!startTime) {
        startTime = Date.now().toString()
        sessionStorage.setItem(STORAGE_KEY, startTime)
    }

    timer = window.setInterval(() => {
        const diff = Math.floor((Date.now() - Number(startTime)) / 1000)
        elapsed.value = diff
        formattedElapsed.value = formatTime(elapsed.value)
    }, 1000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

</script>
<style scoped>
.countdown-footer {
    margin-top: 8px;
}
.main{
    pointer-events: auto;
}
.countdown-footer {
    position: relative;
    overflow: hidden;
    display: inline-block;
    transition: all 0.3s ease;
}

/* 包裹按钮内容的span */
.countdown-footer span {
    display: inline-block;
    white-space: nowrap;
    transition: width 5.0s ease;
    width: 100%;
    overflow: hidden;
}

/* 悬停时宽度缩为0，实现从右向左收缩消失 */
.countdown-footer:hover span {
    width: 0%;
}

</style>
