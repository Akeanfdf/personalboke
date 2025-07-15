<template>
    <div style="margin-left: 800px;"> <texiao1/></div>
    <div class="tag-box">
    <span
        v-for="tag in tags"
        :key="tag"
        :class="['tag-item', { active: tag === activeTag }]"
        @click="activeTag = tag"
    >
      {{ tag }}
    </span>
    </div>
    <div class="link-box">
        <div
            v-for="(item, idx) in linksMap[activeTag]"
            :key="idx"
            class="link-item"
        >
            <div class="icon-name">
                <a
                    :href="item.url"
                >
                <img
                    v-if="item.img"
                    :src="item.img"
                    alt=""
                    class="link-img"
                />

                <span class="art-title">{{ item.name }}</span>
                </a>
            </div>
            <span class="printer-link">
        {{ displayedLinks[idx] }}
      </span>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Texiao1 from "@/components/texiao/texiao1.vue";

const tags = ref(['#搜索引擎', '#社交', '#学习'])
const activeTag = ref(tags.value[0])

const linksMap = {
    '#搜索引擎': [
        { name: '百度', url: 'https://www.baidu.com', img: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
        { name: '谷歌', url: 'https://www.google.com' },
        { name: '必应', url: 'https://www.bing.com' },
    ],
    '#社交': [
        { name: '微博', url: 'https://weibo.com' },
        { name: '知乎', url: 'https://www.zhihu.com' },
        { name: '豆瓣', url: 'https://www.douban.com' },
    ],
    '#学习': [
        { name: '慕课网', url: 'https://www.imooc.com' },
        { name: '力扣', url: 'https://leetcode.cn' },
        { name: '菜鸟教程', url: 'https://www.runoob.com' },
    ]
}

const displayedLinks = ref([]) // 打印机特效用
const typingTimers = ref([])   // 保存定时器，切换标签时清理

const startTypingEffect = () => {
    displayedLinks.value = linksMap[activeTag.value].map(() => '')
    typingTimers.value.forEach(timer => clearInterval(timer))
    typingTimers.value = []

    linksMap[activeTag.value].forEach((item, idx) => {
        let i = 0
        const timer = setInterval(() => {
            if (i <= item.url.length) {
                displayedLinks.value[idx] = item.url.slice(0, i)
                i++
            } else {
                clearInterval(timer)
            }
        }, 100)
        typingTimers.value.push(timer)
    })
}

watch(activeTag, () => {
    startTypingEffect()
})

onMounted(() => {
    startTypingEffect()
})
</script>

<style scoped>
.tag-box {
    width: 60%;
    margin: 20px auto 0 auto;
    display: flex;
    justify-content: center;
    gap: 20px;
    pointer-events: auto;
}
.tag-item {
    padding: 6px 18px;
    border-radius: 20px;
    background: #f0f0f0;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s, color 0.2s;
}
.tag-item.active {
    background: #7c3aed;
    color: #fff;
}
.link-box {
    width: 60%;
    margin: 40px auto 0 auto;
    background: #f8f8ff;
    border-radius: 10px;
    box-shadow: 0 2px 8px grey;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
}
.link-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #4f4f4f;
    font-size: 18px;
    text-decoration: none;
    transition: color 0.2s;
    width: 80%;
    justify-content: flex-start;
}
.icon-name {
    display: flex;
    align-items: center;
    min-width: 120px;
}
.link-img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 16px;
    border-radius: 4px;
    transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
}
.link-img:hover {
    transform: scale(1.3);
    z-index: 2;
}
.art-title {
        font-size: clamp(1rem, 1vw, 2rem);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    background: black;
    -webkit-background-clip: text;
    opacity: 0.4;
    background-clip: text;
    color: transparent;
   font-weight: 700;
}
.printer-link {
    font-family: 'Fira Mono', 'Consolas', monospace;
    margin-left: 24px;
    font-size: 16px;
    letter-spacing: 1px;
    border-right: 2px solid #7c3aed;
    white-space: nowrap;
    animation: blink 1s steps(1) infinite;
}
@keyframes blink {
    0%, 100% { border-color: #7c3aed; }
    50% { border-color: transparent; }
}
</style>