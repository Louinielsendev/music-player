<template>
  <div class="flex justify-between mb-4 h-8" >
  
    <input
      class="bg-neutral-700 rounded p-1 w-1/2 outline-none"
      type="text"
      name="title"
      placeholder="Song Name"
      v-model="localSong.title"
      @input="titleChange"
    />
    <div class="w-1/4 overflow-hidden">
      <input type="file" :id="`cover${props.id}`" name="cover" @change="handleFileUpload" style="display: none;"/>
    <label class="cursor-pointer border-soli" :for="`cover${props.id}`">{{localSong.audio.name ? localSong.audio.name : 'Add File'}}</label>
   
    </div>
    <div v-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </div>
    <div class="cursor-pointer grid place-items-center" @click="emitDeleteSong">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
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
