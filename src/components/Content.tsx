import { useEffect, useState } from "react"
import { api } from "../services/api"
import { MovieCard } from "./MovieCard"

interface GenreResponseProps{
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentI {
  selected: number;
}

export function Content({ selected }: ContentI) {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [ selectedGenre, setSelectedGenre] = useState<GenreResponseProps> ({} as GenreResponseProps)

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selected}`).then(response => {
      setMovies(response.data)
    })

    api.get<GenreResponseProps>(`genres/${selected}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selected]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}

