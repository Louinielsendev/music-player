<template>
  <div class="mt-5 flex justify-between">
    <h1>{{song.title}}</h1>
    <div class="flex gap-2">
      <button @click="downloadSong">
        <Icon name="ic:baseline-download" size="30px" color="white"/>
      </button>
      <button class="h-10 w-10" @click="onPlayClick">
        <Icon v-if="playerStore.isPlaying && songIsPlaying" name="ic:baseline-pause" size="24px"/>
        <Icon v-else name="material-symbols-light:play-arrow" size="37px" color="white" />
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['song'])
  const playerStore = usePlayerStore()
  const supabaseClient = useSupabaseClient()

  const songIsPlaying = computed(() => {
    return playerStore.playingSong.path === props.song.file_url ? true : false
  }) 


  const onPlayClick = () => {
  
    if (!songIsPlaying.value){
      playerStore.changePlayingSong(props.song.file_url, props.song.title)
    } else {
      playerStore.togglePlay()
    }
    
  }

  const downloadSong = async () => {
  const { data, error } = await supabaseClient
    .storage
    .from('songs')
    .download(`${props.song.file_url}`)

  if (error) {
    return
  }

  if (data) {
    const url = window.URL.createObjectURL(data)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${props.song.title}.mp3`)
    
    // This part is necessary for the download to be triggered in Firefox
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url)
  }
};



</script>