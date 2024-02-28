import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event)

  let albums = []
  const { data: albumsData } = await client.from('albums').select('*').order('created_at', {ascending: false})
  
  albums = await Promise.all(albumsData.map(async (alb) => {
    let album = {
      title: alb.title,
      artist: alb.artist,
      releaseDate: alb.release_date,
      imageUrl: alb.cover_image_url,
      id: alb.album_id,
      songs: []
    }

    const { data: songsData } = await client.from('songs').select('*').eq('album_id', alb.album_id)
    songsData.forEach((song) => {
      album.songs.push(song)
    })
    
    return album
  }))

  return { albums }
})

