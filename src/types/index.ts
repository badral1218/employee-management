export interface Joke {
    id:string;
    question:string;
    answer:string
}

export type JokesData = Joke[]

// src/types/movie.ts
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

//TData
export type User = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}