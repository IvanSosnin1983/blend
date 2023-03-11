import { useState, useEffect } from 'react';
import { fetchMovies } from '../components/service/fetch';
import { Button } from './Button/Button';
import { moviesMapper } from 'Helpers/moviesMapper';
import { MovieList } from './MovieList/MovieList';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [posterImage, setPosterImage] = useState('');

  useEffect(() => {
    if (!isMoviesShown) {
      setMovies([]);
      return;
    }
    setIsLoading(true);

    fetchMovies(page)
      .then(({ data: { results } }) => {
        setMovies(prevState => [...prevState, ...moviesMapper(results)]);
        setIsError('');
      })
      .catch(error => setIsError(error.message))
      .finally(() => setIsLoading(false));
  }, [isMoviesShown, page]);

  const showMovieList = () => {
    setIsMoviesShown(prevState => !prevState);
  };

  const handleDelete = movieId => {
    setMovies(prevState => prevState.filter(({ id }) => id !== movieId));
  };

  const changeStatus = movieId => {
    setMovies(prev =>
      prev.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isWatched: !movie.isWatched };
        }
        return movie;
      })
    );
  };
  const openModal = poster => {
    setPosterImage(poster);
  };
  const closeModal = () => {
    setPosterImage('');
  };

  return (
    <>
      <Button
        text={isMoviesShown ? 'Hide Movies List' : 'ShowMovies List'}
        clickHandler={showMovieList}
      />
      {isLoading && <Loader />}

      {isMoviesShown && (
        <MovieList
          movies={movies}
          onDelete={handleDelete}
          changeStatus={changeStatus}
          openModal={openModal}
        />
      )}
      {posterImage && <Modal image={posterImage} onClose={closeModal} />}
    </>
  );
};
