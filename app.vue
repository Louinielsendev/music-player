<template>
    <NuxtLayout >
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup>
    useHead({
  title: 'Music Player',
  meta: [
    { name: 'description', content: 'This is a music player' }
  ]
})
</script>