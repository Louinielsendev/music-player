<template>
  <div class="text-slate-50">
    <div class="h-[40vh]">
      <div class="h-full relative overflow-hidden">
        <transition-group name="fade">
          <div
            v-if="show"
            class="absolute h-full w-full grid place-items-center z-10 tracking-widest"
          >
            <h1 class="text-center font-bold text-3xl font-customFont">
              Loui’s music CATALOUGE
            </h1>
            <client-only>
              <Vue3Lottie
                class="absolute top-0"
                animationLink="https://lottie.host/ea53444a-b4d7-41a1-9b62-fce1c62bf737/fCdeqPgTHO.json"
                :height="200"
                :width="200"
              />
            </client-only>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="p-4">
      <transition name="fade">
        <div class="max-w-screen-md ml-auto mr-auto" v-if="show">
          <UserAlbumContainer />
        </div>
      </transition>
    </div>
  </div>
  <UserPlayer />
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
const show = ref(false)

onMounted(() => {
  show.value = true
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
