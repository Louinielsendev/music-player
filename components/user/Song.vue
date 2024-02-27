<template>
  <div class="mt-5 flex justify-between">
    <h1>{{song.title}}</h1>
    <div class="flex gap-2">
      <button>
        <Icon name="ic:baseline-download" size="30px" color="white"/>
      </button>
      <button @click="setPlayingSong">
        <Icon name="material-symbols-light:play-arrow" size="37px" color="white" />
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