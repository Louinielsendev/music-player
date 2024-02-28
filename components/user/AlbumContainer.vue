<template>
    <div class="bg-neutral-900 p-4 rounded -mt-20 mb-20">
        <UserAlbum v-for="album in albumsArray"
            :album="album"
        />
        
        
    </div>
</template>

<script setup>
const playerStore = usePlayerStore()

const albumsArray = ref(null)

onMounted(async () => {
   albumsArray.value = await fetchAlbums()
})

const fetchAlbums = async () => {
  const { albums } = await $fetch('/api/albums')
  if (albums) {
    albums.forEach((album) => {
        album.songs.forEach((song) => {
            playerStore.addSongToSongs(song)
        })
        
    })
  }
  return albums
}
</script>