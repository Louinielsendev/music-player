import { defineStore } from 'pinia'

export const usePlayerStore = defineStore({
    id: 'player-store',
    state:() => {
        return {
            playingSong: {
                path: '',
                name: ''
            },
            playing: false,
            songs: []
        }
    },

    actions: {
        changePlayingSong(path: string, name: string){
            this.playingSong.path = path
            this.playingSong.name = name
            this.playing = true
        },
        togglePlay(){
            this.playing = !this.playing
        },
        
        addSongToSongs(song: Object){
            this.songs.push(song)
        },
        nextSong(){
            const index = this.currentSongIndex
            let nextSong
            if(index < this.songs.length){
                nextSong = this.songs[index + 1]
            } else {
                nextSong = this.songs[0]
               console.log(nextSong)
            }
            console.log(nextSong)
            this.playingSong.path = nextSong.file_url
            this.playingSong.name = nextSong.title
        },
        prevSong(){
            
            const index = this.currentSongIndex
            let nextSong
            if(index > 0){
                nextSong = this.songs[index - 1]
            } else {
                nextSong = this.songs[this.songs.length -1]
                
            }
            this.playingSong.path = nextSong.file_url
            this.playingSong.name = nextSong.title
        },
       
    },

    getters: {
        isPlaying(){
            return this.playing
        },
        currentSongIndex() {
            const currentSongPath = this.playingSong.path
            return this.songs.findIndex(song => song.file_url === currentSongPath)
        }

    }
})