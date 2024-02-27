<template>
  <div v-if="playingSongPath" class="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
    <div class="grid grid-cols-2 h-full items-center">
      <div>
      {{ playingSongName }}
    </div>
    <div @click="togglePlayback" class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
      <Icon v-if="playing" name="ic:baseline-pause" size="20px" color="black"/>
      <Icon v-else name="material-symbols-light:play-arrow" size="50px" color="black" />
    </div>
    </div>
    
  </div>
</template>

<script setup>
const playingSongPath = usePlayingSongPath()
const playingSongName = usePlayingSongName()
const playing = usePlaying()
const supabaseClient = useSupabaseClient()
const songFile = ref('')

const audio = ref(null)

onMounted(() => {
  loadSong()
})

watch(playingSongName,  () => {
  loadSong()
})

const loadSong = async () => {
  if (playingSongPath.value) {
    const { data: songData } = await supabaseClient.storage
      .from('songs')
      .getPublicUrl(playingSongPath.value)
    songFile.value = songData.publicUrl
    if (audio.value) {
      audio.value.pause()
    }
    audio.value = new Audio(songFile.value)
    if (playing.value) {
      audio.value.play()
    }
  }
}

const togglePlayback = () => {
  if (playing.value && audio.value) {
    audio.value.pause()
  } else if (audio.value) {
    audio.value.play()
  }
  playing.value = !playing.value 
}

watch(playing, (newVal) => {
  
  if (newVal && audio.value) {
    audio.value.play()
  } else if (audio.value) {
    audio.value.pause()
  }
})
</script>
