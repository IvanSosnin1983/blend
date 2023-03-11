import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';

export const Modal = ({ image, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const closeModalOnEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModalOnEscape);
    return () => {
      window.removeEventListener('keydown', closeModalOnEscape);
    };
  }, [onClose]);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="Backdrop">
      <div className="Modal">
        <img
          src={`http://image.tmdb.org/t/p/original${image}`}
          alt="moviesIllustartion"
          width="400px"
          onLoad={onLoad}
          style={{ display: loaded ? 'block' : 'none' }}
        />
        {!loaded && <Loader />}
        <button onClick={() => onClose()} type="button">
          Close
        </button>
      </div>
    </div>
  );
};
