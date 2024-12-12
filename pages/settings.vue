<template>
    <div class="w-[100%] h-[90vh] flex justify-center items-center">Work in Progress...</div>
</template>

<script setup lang="ts">
useHead({
    title: 'Ridex | Settings',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ]
})

definePageMeta({
    colorMode: "_light" as "light" | "dark",
    middleware: 'auth-required'
})
</script>