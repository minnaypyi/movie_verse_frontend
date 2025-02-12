export const TSortType = [
  'popularity.desc',
  'popularity.asc',
  'release_date.desc',
  'release_date.asc',
  'vote_count.desc',
  'vote_count.asc',
  'original_title.asc',
  'original_title.desc',
];

export const TFilterCategory = ['discover', 'tv'];

export const TMediaType = ['movie', 'tv'];

export const defaultFilterProps = {
  genre: '',
  sort: '',
  year: '',
  query: '',
};

export const defaultState = {
  filters: {
    tv: defaultFilterProps,
    discover: defaultFilterProps,
  },
  misc: {
    isLoading: false,
    darkMode: true,
  },
  genre: {
    genres: [],
    current: null,
  },
  movies: {
    trending: null,
    discover: null,
    current: {
      movie: null,
      keywords: [],
      casts: [],
      reviews: [],
    },
    popular: null,
    topRated: null,
    upcoming: null,
    tvShows: null,
  },
  people: {
    people: null,
    current: {
      actor: null,
      casting: [],
    },
  },
  search: {
    query: '',
    tv: null,
    movies: null,
    people: null,
    recent: [],
  },
  favorites: [],
};

export const defaultMovieData = {
  adult: false,
  name: '',
  id: null,
  poster_path: '',
  original_name: '',
  original_title: '',
  original_language: '',
  release_date: '',
  first_air_date: '',
  backdrop_path: '',
  vote_average: 0,
  vote_count: 0,
  title: '',
  homepage: '',
  genres: [],
  overview: '',
  popularity: 0,
  budget: 0,
  genre_ids: [],
  imdb_id: null,
  revenue: 0,
  runtime: null,
  status: '',
  tagline: null,
  media_type: '',
  video: false,
  videos: {
    id: null,
    results: [],
  },
  similar: null,
  images: {
    backdrops: [],
    posters: [],
  },
};

export const defaultActorData = {
  adult: false,
  gender: null,
  id: null,
  known_for: [],
  known_for_department: '',
  name: '',
  original_name: '',
  popularity: 0,
  profile_path: '',
  cast_id: 0,
  character: '',
  credit_id: '',
  other: 0,
  also_known_as: [],
  biography: '',
  birthday: '',
  deathday: null,
  homepage: null,
  imdb_id: '',
  place_of_birth: '',
  images: {
    profiles: [],
  },
};

export const defaultReviewData = {
  author: '',
  author_details: {
    name: '',
    username: '',
    avatar_path: null,
    rating: 0,
  },
  content: '',
  created_at: '',
  id: '',
  updated_at: '',
  url: '',
};

export const defaultImageData = {
  file_path: '',
  aspect_ratio: 0,
  height: 0,
  width: 0,
};

export const defaultGenre = {
  id: 0,
  name: '',
};

export const defaultKeyword = {
  id: 0,
  name: '',
};

export const defaultResponse = {
  page: 1,
  results: [],
  total_results: 0,
  total_pages: 0,
};
