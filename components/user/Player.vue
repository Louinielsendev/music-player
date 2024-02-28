<template>
  <div
    v-if="playerStore.playingSong.path"
    class="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4"
  >
    <div class="grid grid-cols-2 h-full items-center">
      <div>
        {{ playerStore.playingSong.name }}
      </div>
      <div class="flex justify-end md:justify-start items-center">
        <div @click="prevSong" class="cursor-pointer"><Icon name="material-symbols:skip-previous" size="30px" color="white"/></div>
        <div
          @click="togglePlayback"
          class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon
            v-if="playerStore.playing"
            name="ic:baseline-pause"
            size="20px"
            color="black"
          />
          <Icon
            v-else
            name="material-symbols-light:play-arrow"
            size="50px"
            color="black"
          />
        </div>
        <div @click="nextSong" class="cursor-pointer"><Icon name="material-symbols:skip-next" size="30px" color="white"/> </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabaseClient = useSupabaseClient()
const songFile = ref('')
const audio = ref(null)
const playerStore = usePlayerStore()
const { playing } = storeToRefs(playerStore)

onMounted(() => {
  loadSong()
})

watch(playerStore.playingSong, () => {
  loadSong()
})

watch(playing, newVal => {
  if (newVal && audio.value) {
    audio.value.play()
  } else if (audio.value) {
    audio.value.pause()
  }
})

const loadSong = async () => {
  console.log(playerStore.playingSong)
  if (playerStore.playingSong.path) {
    const { data: songData } = await supabaseClient.storage
      .from('songs')
      .getPublicUrl(playerStore.playingSong.path)
    songFile.value = songData.publicUrl
    if (audio.value) {
      audio.value.pause()
    }
    audio.value = new Audio(songFile.value)

    audio.value.onended = () => {
      nextSong()
    }
    
    if (playerStore.playing) {
      audio.value.play()
    }
  }
}

const togglePlayback = () => {
  if (playerStore.playing && audio.value) {
    audio.value.pause()
  } else if (audio.value) {
    audio.value.play()
  }
  playerStore.togglePlay()
}

const nextSong = () => {
  playerStore.nextSong()
}

const prevSong = () => {
  playerStore.prevSong()
}
</script>
