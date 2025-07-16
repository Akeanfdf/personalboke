<template>
    <div class="main mt2">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <canvas ref="canvas"></canvas>
                    <input v-model="text" placeholder="输入内容生成二维码" />
                    <button  style="margin-left: 10px" @click="generateQRCode">文字生成二维码</button>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <img :src="qrUrl" alt="二维码" />
                    <input v-model="url" placeholder="输入链接" />
                    <button style="margin-left: 10px" @click="generateQRCode1">链接生成二维码</button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import QRCode from 'qrcode'

const text = ref('Hello World')
const canvas = ref(null)

const generateQRCode = () => {
    QRCode.toCanvas(canvas.value, text.value, { width: 200 }, function (error) {
        if (error) console.error(error)
    })
}

const url = ref('https://example.com')
const qrUrl = ref('http://localhost:5173/Qrcode?url=https://example.com')

const generateQRCode1 = async () => {
    try {
        qrUrl.value = await QRCode.toDataURL(url.value, { width: 200 })
    } catch (err) {
        console.error(err)
    }
}
onMounted(() => {
    generateQRCode()
    generateQRCode1()
})
</script>

<style scoped>
.main{
    pointer-events: auto;
    position: relative;
    overflow: hidden;
}
</style>