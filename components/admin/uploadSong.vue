<template>
  <div class="mb-6">
    <input
      class="bg-neutral-700 rounded w-full p-1 outline-none mb-2"
      type="text"
      name="title"
      placeholder="Song Name"
      v-model="localSong.title"
      @input="titleChange"
    />
     
 
  <div class="overflow-hidden">
    <label for="cover">Choose a MP3-file</label>
    <input  class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none" type="file" name="cover" @change="handleFileUpload" />
  
    </div>
    <div v-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </div>
    
      <div class="cursor-pointer grid place-items-center" @click="emitDeleteSong">
      <Icon name="material-symbols:delete" size="20px"/>
    </div>
   
  </div>
    
    

</template>

<script setup>
const errorMessage = ref('')
const localSong = ref({
  title: null,
  audio: null
})

const props = defineProps(['id', 'song'])
const emit = defineEmits(['songChange', 'deleteSong'])

const titleChange = event => {
  emitSongChange()
}

const emitSongChange = () => {
  emit('songChange', localSong.value, props.id, )
}

const emitDeleteSong = () => {
  emit('deleteSong', props.id)
}

const handleFileUpload = event => {
  localSong.value.audio = event.target.files[0]
  if (!localSong.value.audio) {
    return
  }
  errorMessage.value = ''

  if (localSong.value.audio.type === 'audio/mpeg') {
    emitSongChange()
  } else {
    errorMessage.value = 'Choose MP3-file.'
  }
}

watchEffect(() => {
  localSong.value = {
    title: props.song.title,
    audio: props.song.audio
  }
})
</script>
