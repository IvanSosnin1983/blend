export const MovieList = ({ movies, onDelete, changeStatus, openModal }) => {
  return (
    <ul>
      {movies.map(({ isWatched, poster, votes, title, id }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <p>Watched: {`${isWatched}`}</p>
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
            <button type="button" onClick={() => changeStatus(id)}>
              Change Status
            </button>
            <button type="button" onClick={() => openModal(poster)}>
              OpenModal
            </button>
          </li>
        );
      })}
    </ul>
  );
};
