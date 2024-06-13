export type Artist = {
  artistName: string;
  id: string;
  spotifyUrl: string;
};

export type Album = {
  albumName: string;
  id: string;
  releaseDate: string;
  spotifyUrl: string;
  genres: string[];
  rating: string;
  albumType: string;
  artists: Artist[];
  images: string[];
};

export type Song = {
  id: string;
  name: string;
  previewUrl: string;
  spotifyUrl: string;
  durationMs: number;
  album: Album;
  artists: Artist[];
};

export type MusicPlayerState = {
  prevSong: Song;
  nowSong: Song;
  nextSong: Song;
};

export type RecommendationRes = {
  prevSong: Song;
  nowSong: Song;
  nextSong: Song;
};

export type AlbumSimple = {
  albumName: string;
  id: string;
  releaseDate: string;
  spotifyUrl: string;
  genres: string[];
  rating: string;
  albumType: string;
  artists: Artist[];
  images: string[];
};

export type SongInfo = {
  id: string;
  name: string;
  previewUrl: string;
  spotifyUrl: string;
  durationMs: number;
  album: AlbumSimple;
  artists: Artist[];
};

export type RelatedSong = {
  id: string;
  name: string;
  albumId: string;
  previewUrl: string;
  artists: Artist[];
  images: string[];
};

export type AlbumInfoResponse = {
  album: {
    albumSimple: AlbumSimple;
    songs: SongInfo[];
  };
  relatedSongs: RelatedSong[];
};

export type IsMusicSavedRes = {
  count: number;
  saved: boolean;
};

export type SavedMusic = {
  id: string;
  title: string;
  artist: {
    spotifyUrl: string;
    artistName: string;
    id: string;
  };
  album: {
    albumName: string;
    images: string[];
  };
  trackId: string;
  previewUrl: string;
  spotifyUrl: string;
};

export type SavedMusicsRes = { savedMusics: SavedMusic[] };

export type CreatePlayListReq = {
  name: string;
  genreIds: string[];
};

export type CreatePlayListRes = {
  id: number;
};

export type PlaylistMusic = {
  music: {
    id: number;
    trackId: string;
    title: string;
    artist: string;
    imageUrl: string;
  };
  memo: string;
};

export type PlaylistRes = {
  id: number;
  name: string;
  createdAt: string;
  musicCount: number;
  genreIds: number[];
  playlistMusics: PlaylistMusic[];
  complete: boolean;
  deleted: boolean;
};

export type SearchReq = {
  title: string;
  limit: number;
  offset: number;
  type: "TRACK";
};

export type Track = {
  id: string;
  name: string;
  previewUrl: string | null;
  spotifyUrl: string;
  durationMs: number;
  album: Album;
  artists: Artist[];
};

export type SearchRes = {
  tracks: Track[];
};

export type AddMusicReq = {
  trackId: "string";
  title: "string";
  artists: "string[]";
  imageUrl: "string";
};
