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
  genres: string;
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
