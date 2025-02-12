import { addToFavorites as addFavorites, removeFromFavorites } from '@app/redux/actions/favoriteActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useFavorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = (movieId) => favorites.some((item) => item.id === movieId);

  const addToFavorites = (movie) => {
    if (!movie) return;

    if (!isFavorite(movie.id)) {
      dispatch(addFavorites(movie));
      toast.dismiss();
      toast.dark(`${movie.original_name || movie.original_title} \n Added to favorites`);
    } else {
      dispatch(removeFromFavorites(movie.id));
      toast.dismiss();
      toast.dark(`${movie.original_name || movie.original_title} \n Removed from favorites`, {
        autoClose: 5000,
        progressStyle: { backgroundColor: '#DC143C' }
      });
    }
  };

  return { favorites, isFavorite, addToFavorites };
};

export default useFavorites;
