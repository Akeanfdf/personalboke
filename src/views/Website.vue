<template>
    <div>
        <div style="text-align: center;">
            <texiao1/>
        </div>
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
        <div class="Website">
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
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Texiao1 from "@/components/texiao/texiao1.vue";

const tags = ref([
    '#搜索引擎',
    '#社交',
    '#学习',
    '#开发工具',
    '#设计与创意',
    '#新闻资讯',
    '#视频与音乐',
    '#购物电商',
    '#云服务',
    '#效率与办公',
    '#AI工具'
])

const activeTag = ref(tags.value[0])

const linksMap = {
    '#搜索引擎': [
        { name: '百度', url: 'https://www.baidu.com', img: 'https://www.baidu.com/favicon.ico' },
        { name: '谷歌', url: 'https://www.google.com', img: 'https://www.google.com/favicon.ico' },
        { name: '必应', url: 'https://www.bing.com', img: 'https://www.bing.com/sa/simg/favicon-2x.ico' },
        { name: '搜狗', url: 'https://www.sogou.com', img: 'https://www.sogou.com/images/logo/new/favicon.ico' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com', img: 'https://duckduckgo.com/favicon.ico' }
    ],
    '#社交': [
        { name: '微博', url: 'https://weibo.com', img: 'https://weibo.com/favicon.ico' },
        { name: '微信网页版', url: 'https://wx.qq.com', img: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico' },
        { name: '知乎', url: 'https://www.zhihu.com', img: 'https://static.zhihu.com/heifetz/favicon.ico' },
        { name: 'Twitter (X)', url: 'https://x.com', img: 'https://abs.twimg.com/favicons/twitter.2.ico' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com', img: 'https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico' }
    ],
    '#学习': [
        { name: '菜鸟教程', url: 'https://www.runoob.com', img: 'https://static.runoob.com/images/favicon.ico' },
        { name: 'W3Schools', url: 'https://www.w3schools.com', img: 'https://www.w3schools.com/favicon.ico' },
        { name: 'MDN', url: 'https://developer.mozilla.org', img: 'https://developer.mozilla.org/static/img/favicon32.7f3da72dcea1.png' },
        { name: 'Vue官方文档', url: 'https://cn.vuejs.org', img: 'https://cn.vuejs.org/logo.svg' },
        { name: 'React官方文档', url: 'https://react.dev', img: 'https://react.dev/favicon.ico' },
        { name: '力扣 (LeetCode)', url: 'https://leetcode.cn', img: 'https://leetcode.cn/favicon.ico' }
    ],
    '#开发工具': [
        { name: 'GitHub', url: 'https://github.com', img: 'https://github.githubassets.com/favicons/favicon.svg' },
        { name: 'Gitee', url: 'https://gitee.com', img: 'https://gitee.com/static/images/logo.png' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', img: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico' },
        { name: 'CodePen', url: 'https://codepen.io', img: 'https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png' },
        { name: 'JSFiddle', url: 'https://jsfiddle.net', img: 'https://jsfiddle.net/favicon.ico' }
    ],
    '#设计与创意': [
        { name: 'Dribbble', url: 'https://dribbble.com', img: 'https://cdn.dribbble.com/assets/favicon.ico' },
        { name: 'Behance', url: 'https://www.behance.net', img: 'https://a5.behance.net/06ef0ccf9466/favicon.ico' },
        { name: 'Figma', url: 'https://www.figma.com', img: 'https://static.figma.com/app/icon/1/favicon.svg' },
        { name: 'Canva', url: 'https://www.canva.com', img: 'https://static.canva.com/static/images/favicon.ico' },
        { name: '花瓣网', url: 'https://huaban.com', img: 'https://huaban.com/favicon.ico' },
    ],
    '#新闻资讯': [
        { name: '新华网', url: 'http://www.xinhuanet.com', img: 'http://www.xinhuanet.com/favicon.ico' },
        { name: '人民网', url: 'http://www.people.com.cn', img: 'http://www.people.com.cn/favicon.ico' },
        { name: 'BBC News', url: 'https://www.bbc.com/news', img: 'https://www.bbc.com/favicon.ico' },
        { name: 'CNN', url: 'https://edition.cnn.com', img: 'https://edition.cnn.com/favicon.ico' },
        { name: 'The New York Times', url: 'https://www.nytimes.com', img: 'https://www.nytimes.com/favicon.ico' }
    ],
    '#视频与音乐': [
        { name: 'BiliBili', url: 'https://www.bilibili.com', img: 'https://www.bilibili.com/favicon.ico' },
        { name: 'YouTube', url: 'https://www.youtube.com', img: 'https://www.youtube.com/s/desktop/1d8e5959/img/favicon_32x32.png' },
        { name: '爱奇艺', url: 'https://www.iqiyi.com', img: 'https://www.iqiyi.com/favicon.ico' },
        { name: '腾讯视频', url: 'https://v.qq.com', img: 'https://v.qq.com/favicon.ico' },
        { name: '网易云音乐', url: 'https://music.163.com', img: 'https://s1.music.126.net/style/favicon.ico' },
        { name: 'Spotify', url: 'https://www.spotify.com', img: 'https://www.scdn.co/i/_global/favicon.png' }
    ],
    '#购物电商': [
        { name: '淘宝', url: 'https://www.taobao.com', img: 'https://www.taobao.com/favicon.ico' },
        { name: '京东', url: 'https://www.jd.com', img: 'https://www.jd.com/favicon.ico' },
        { name: '拼多多', url: 'https://www.pinduoduo.com', img: 'https://cdn.pinduoduo.com/favicon.ico' },
        { name: '亚马逊', url: 'https://www.amazon.com', img: 'https://www.amazon.com/favicon.ico' },
        { name: 'eBay', url: 'https://www.ebay.com', img: 'https://www.ebay.com/favicon.ico' }
    ],
    '#云服务': [
        { name: '阿里云', url: 'https://www.aliyun.com', img: 'https://www.aliyun.com/favicon.ico' },
        { name: '腾讯云', url: 'https://cloud.tencent.com', img: 'https://cloud.tencent.com/favicon.ico' },
        { name: '华为云', url: 'https://www.huaweicloud.com', img: 'https://www.huaweicloud.com/favicon.ico' },
        { name: 'AWS', url: 'https://aws.amazon.com', img: 'https://aws.amazon.com/favicon.ico' },
        { name: 'Google Cloud', url: 'https://cloud.google.com', img: 'https://cloud.google.com/favicon.ico' },
        { name: 'Azure', url: 'https://azure.microsoft.com', img: 'https://azure.microsoft.com/favicon.ico' }
    ],
    '#效率与办公': [
        { name: '石墨文档', url: 'https://shimo.im', img: 'https://shimo.im/favicon.ico' },
        { name: '飞书', url: 'https://www.feishu.cn', img: 'https://www.feishu.cn/favicon.ico' },
        { name: 'Notion', url: 'https://www.notion.so', img: 'https://www.notion.so/front-static/favicon.ico' },
        { name: 'Evernote (印象笔记)', url: 'https://www.yinxiang.com', img: 'https://www.yinxiang.com/favicon.ico' },
        { name: 'Trello', url: 'https://trello.com', img: 'https://trello.com/favicon.ico' },
        { name: 'Slack', url: 'https://slack.com', img: 'https://slack.com/favicon.ico' }
    ],
    '#AI工具': [
        { name: 'ChatGPT', url: 'https://chat.openai.com', img: 'https://chat.openai.com/apple-touch-icon.png' },
        { name: 'Claude', url: 'https://www.anthropic.com/claude', img: 'https://www.anthropic.com/favicon.ico' },
        { name: 'Gemini', url: 'https://gemini.google.com', img: 'https://gemini.google.com/favicon.ico' },
        { name: 'Perplexity', url: 'https://www.perplexity.ai', img: 'https://www.perplexity.ai/favicon.ico' },
        { name: 'Midjourney', url: 'https://www.midjourney.com', img: 'https://www.midjourney.com/favicon.ico' },
        { name: 'Synthesia', url: 'https://www.synthesia.io', img: 'https://www.synthesia.io/favicon.ico' }
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
.Website{
    overflow: scroll;
}
.tag-box {
    width: 100%;
    margin: 20px auto 0 auto;
    display: flex;
    flex-wrap: wrap;          /* 支持换行 */
    justify-content: center;  /* 居中对齐每一行 */
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

.Website{
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