import { defineStore } from 'pinia'

interface Song {
  file_url: string
  title: string
}

export const usePlayerStore = defineStore({
  id: 'player-store',
  state: () => ({
    playingSong: {
      path: '',
      name: ''
    },
    playing: false,
    songs: [] as Song[]
  }),
  actions: {
    changePlayingSong (path: string, name: string) {
      this.playingSong.path = path
      this.playingSong.name = name
      this.playing = true
    },
    togglePlay () {
      this.playing = !this.playing
    },
    addSongToSongs (song: Song) {
      this.songs.push(song)
    },
    nextSong () {
      const index = this.currentSongIndex
      const nextSong = this.songs[index + 1] || this.songs[0]
      this.playingSong.path = nextSong.file_url
      this.playingSong.name = nextSong.title
    },
    prevSong () {
      const index = this.currentSongIndex
      const nextSong =
        index > 0 ? this.songs[index - 1] : this.songs[this.songs.length - 1]
      this.playingSong.path = nextSong.file_url
      this.playingSong.name = nextSong.title
    }
  },
  getters: {
    isPlaying (): boolean {
      return this.playing
    },
    currentSongIndex (): number {
      const currentSongPath = this.playingSong.path
      return this.songs.findIndex(song => song.file_url === currentSongPath)
    }
  }
})
