<template>
  <div class="max-w-md bg-neutral-800 m-3 rounded-sm p-4">
    <form @submit.prevent="upload">
      <input
        class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none"
        type="text"
        name="title"
        placeholder="Album Title"
        v-model="albumTitle"
      />
      <br />
      <input
        class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none"
        type="text"
        name="artist"
        placeholder="Artist Name"
        v-model="artistName"
      />
      <br />
      <input
        class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none"
        type="text"
        name="release"
        placeholder="Release Year"
        v-model="releaseYear"
      />
      <br />
      <label for="cover">Album Cover</label>
      <input  class="bg-neutral-700 rounded p-1 w-full outline-none" type="file" name="cover" @change="handleFileUpload" />
      <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      
      <div class="w-full overflow-hidden">
        <adminUploadSong
          v-for="(song, index) in songs"
          :key="`song-${index}-${resetKey}`"
          :id="index"
          :song="song"
          @song-change="updateSong"
          @delete-song="deleteSong"
        />
      </div>
      <div @click="addSong" class="cursor-pointer pt-3">Add Song</div>
      <button>Upload</button>
    </form>
  </div>
</template>

<script setup>
const albumTitle = ref('')
const artistName = ref('')
const releaseYear = ref('')
const songs = ref([])
const errorMessage = ref('')
const file = ref()
const imageLoaded = ref(false)
const resetKey = ref(0)
const isLoading = ref(false)
const supabaseClient = useSupabaseClient()

const validate = () => {
  let valid = true

  if (valid) {
    valid = validateTitle()
  }

  if (valid) {
    valid = validateName()
  }

  if (valid) {
    valid = validateImage()
  }

  if (valid) {
    valid = validateSongs()
  }

  return valid
}

const validateTitle = () => {
  return albumTitle.value
}

const validateName = () => {
  return artistName.value
}

const validateImage = () => {
  return imageLoaded.value
}

const validateSongs = () => {
  let valid = true
  if (songs.value.length < 1) {
    valid = false
  } else {
    songs.value.forEach(song => {
      if (!song.title) {
        valid = false
      } else if (!song.audio) {
        valid = false
      }
    })
  }
  return valid
}

const upload = async () => {
  try {
    isLoading.value = true
    if (!validate()) {
      return
    }
    console.log('valid')
    var id = Math.random().toString(16).slice(2)

    // Upload album
    const { data: imageData, error: imageError } = await supabaseClient.storage
      .from('images')
      .upload(`imageAlbum-${albumTitle.value}-${id}`, file.value, {
        cacheControl: '3600',
        upsert: false
      })
    if (imageError) {
      isLoading.value = false
      console.log(imageError)
      return
    }

    const { data: albumData, error: supabaseError } = await supabaseClient
      .from('albums')
      .insert({
        title: albumTitle.value,
        artist: artistName.value,
        release_date: releaseYear.value
          ? releaseYear.value
          : new Date().getFullYear(),
        cover_image_url: imageData.path
      })
      .select()

    if (supabaseError) {
      isLoading.value = false
      console.log(supabaseError)
      return
    }

    let albumId = null
    if (albumData) {
      albumId = albumData[0].album_id
    }
    // upload songs
    songs.value.forEach(async song => {
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${song.title}-${id}`, song.audio, {
          cacheControl: '3600',
          upsert: false
        })
      if (songError) {
        isLoading.value = false
        console.log(songError)
        return
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          album_id: albumId,
          title: song.title,
          file_url: songData.path
        })

      if (supabaseError) {
        isLoading.value = false
        console.log(supabaseError)
        return
      }
    })
  } catch {
  } finally {
    isLoading.value = false
    console.log('succes')
  }
}

const addSong = () => {
  songs.value.push({ title: null, audio: '' })
}

const updateSong = (song, index) => {
  songs.value[index] = song
}

const deleteSong = index => {
  songs.value = songs.value.filter((s, idx) => idx !== index)
  resetKey.value = Math.random()
}

const handleFileUpload = event => {
  file.value = event.target.files[0]
  if (!file.value) {
    return
  }
  errorMessage.value = ''

  if (file.value.type.match('image.*')) {
    imageLoaded.value = !imageLoaded.value
  } else {
    errorMessage.value = 'Please select an image file.'
  }
}
</script>
