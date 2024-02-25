<template>
  <div class="mt-5 flex justify-between">
    <h1>{{song.title}}</h1>
    <div class="flex gap-2">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
      <button @click="setPlayingSong">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mt-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
  const playingSongPath = usePlayingSongPath()
  const playingSongName = usePlayingSongName()
  const props = defineProps(['song'])

  const setPlayingSong = () => {
    playingSongPath.value = props.song.file_url
    playingSongName.value = props.song.title
  }
</script>