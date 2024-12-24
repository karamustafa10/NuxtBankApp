<template>
    <div class="flex justify-center items-center">
        <img src="../public/img/loading.png" alt="">
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

@keyframes rotate_500 {
    from,
    to {
        animation-timing-function: ease-in;
        transform: rotateY(360deg);
    }

    25%,
    75% {
        animation-timing-function: ease-out;
        transform: rotateY(180deg);
    }

    50% {
        animation-timing-function: ease-in;
        transform: rotateY(360deg);
    }
}

img {
    animation: rotate_500 5s infinite;
}

</style>