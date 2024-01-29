import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { dispatchMe } from "../../redux/slice/UserSlice";
import {
  getFilm,
  selectFilmList,
  addtoFavList,
  searchFilm,
} from "../../redux/slice/FilmReducer";
import { selectLoggedUser, selectFavs } from "../../redux/slice/UserSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const filmList = useSelector(selectFilmList);
  const favsList = useSelector(selectFavs);
  const connectedUser = useSelector(selectLoggedUser);
  const [favs, setFavs] = useState();

  useEffect(() => {
    dispatch(dispatchMe());
    dispatch(getFilm());
  }, [dispatch]);

  useEffect(() => {
    const favorisIds = favsList.flat().map((item) => item.movie.id);

    const filteredMovi = filmList.filter((movie) =>
      favorisIds.includes(movie.id)
    );
    setFavs(filteredMovi);
  }, [favsList, filmList]);

  const handleChange = (e) => {
    dispatch(searchFilm(e.currentTarget.value));
  };

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="overflow-scroll h-[100%] p-[3%] flex flex-col gap-16">
        <div className="w-[100%] flex justify-center">
          <input
            type="text"
            className="w-[70%] h-10 p-5 border border-gray-200 rounded-md"
            placeholder="Recherche"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-[3] h-fit flex-wrap gap-5">
          {filmList
            .filter((element) => !favs?.includes(element))
            ?.map((item, key) => (
              <div
                className="w-[30%] h-fit bg-gray-100 border rounded-md p-[3%] flex flex-col gap-5"
                key={key}
              >
                <div className="flex gap-5">
                  <h2 className="font-bold">Titre</h2>
                  <p>{item.title}</p>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold self-start">Description:</h2>
                  <p className="text-justify">{item.description}</p>
                </div>
                <div className="flex gap-5">
                  <h2 className="font-bold">Date de sortie:</h2>
                  <p>{item.releaseDate.split("T")[0]}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-[50%] h-10 bg-gray-800 border rounded-md text-white hover:bg-slate-400"
                    onClick={() => {
                      dispatch(
                        addtoFavList({ owner: connectedUser.id, film: item.id })
                      );
                      dispatch(getFilm());
                      dispatch(dispatchMe());
                    }}
                  >
                    {"+ Favoris"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
