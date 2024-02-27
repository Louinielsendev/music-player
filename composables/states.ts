export const usePlayingSongPath = () => useState<string>('playingSongPath', () => '')
export const usePlayingSongName = () => useState<string>('playingSongName', () => '')
export const usePlaying = () => useState<boolean>('playing', () => true)
export const useAlbums = () => useState<Array>('albums', () => [])