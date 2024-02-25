<template>
    <div class="h-full grid place-items-center">
        <AdminUpload/>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
    })
</script>