<template>
  <div class="bg-neutral-900 p-4 rounded -mt-20 mb-20">
    <UserAlbum v-for="album in albumsArray" :album="album" />
    <div v-if="!albumsLoaded">
      <GeneralSkeletonLoader />
      <GeneralSkeletonLoader />
    </div>
  </div>
</template>

<script setup>
const playerStore = usePlayerStore()
const albumsLoaded = ref(false)
const albumsArray = ref(null)

onMounted(async () => {
  albumsArray.value = await fetchAlbums()
})

const fetchAlbums = async () => {
  const { albums } = await $fetch('/api/albums')
  if (albums) {
    albums.forEach(album => {
      album.songs.forEach(song => {
        playerStore.addSongToSongs(song)
      })
    })
    albumsLoaded.value = true
  }
  return albums
}
</script>
