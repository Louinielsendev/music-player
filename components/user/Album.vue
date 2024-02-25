<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="">
        <img v-if="albumImg" :src="albumImg" class="h-24 rounded-sm" />
      </div>
      <div class="flex flex-col justify-end gap-1">
        <h2 class="font-bold text-xl">{{ album.title }}</h2>
        <div class="flex gap-1">
          <h2>{{ album.artist }}</h2>
          -
          <p>{{ album.releaseDate }}</p>
        </div>
      </div>
    </div>
    <UserSong v-for="song in album.songs" :song="song" />
  </div>
</template>

<script setup>
const  props  = defineProps(['album'])
const supabaseClient = useSupabaseClient()
const albumImg = ref(null)

onMounted(() => {
    getAlbumImg()
})

const getAlbumImg = () => {
    const {data} = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(props.album.imageUrl)
    albumImg.value = data.publicUrl
}
</script>
