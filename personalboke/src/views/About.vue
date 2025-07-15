<script setup>
import { useAnimationFrame } from "motion-v"
import { ref } from "vue"

const cubeRef = ref(null)

useAnimationFrame((t) => {
    if (!cubeRef.value) return

    const rotate = Math.sin(t / 10000) * 200
    const y = (1 + Math.sin(t / 1000)) * -50
    cubeRef.value.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
})
</script>

<template>
    <div class="container">
        <div class="cube" ref="cubeRef">
            <div class="side front" ></div>
            <div class="side left" ></div>
            <div class="side right" ></div>
            <div class="side top" ></div>
            <div class="side bottom" ></div>
            <div class="side back" ></div>
        </div>
    </div>
</template>

<style>
.container {
    perspective: 800px;
    width: 200px;
    height: 200px;
    margin: auto;
}

.cube {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-30deg)
}

.side {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: red;
    opacity: 0.6;
}

.front {
    transform: rotateY(0deg) translateZ(100px);
    background-color: #646cff;
}

.right {
    transform: rotateY(90deg) translateZ(100px);
    background-color: #646cff;
}
.back {
    transform: rotateY(180deg) translateZ(100px);
    background-color: #646cff;

}
.left {
    transform: rotateY(-90deg) translateZ(100px);
    background-color: #646cff;

}
.top {
    transform: rotateX(90deg) translateZ(100px);
    background-color: #646cff;

}
.bottom {
    transform: rotateX(-90deg) translateZ(100px);
    background-color: #646cff;
}
</style>
