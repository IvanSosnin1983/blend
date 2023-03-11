export const moviesMapper = array => {
  return array.map(({ poster_path: poster, vote_count: votes, title, id }) => ({
    isWatched: false,
    poster,
    votes,
    title,
    id,
  }));
};
