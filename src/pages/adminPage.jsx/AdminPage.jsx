import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import {
  getFilm,
  postFilm,
  selectFilmList,
  putFilm,
  deleteFilm
} from "../../redux/slice/FilmReducer";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const filmList = useSelector(selectFilmList);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [filmData, setfilmData] = useState({
    id: null,
    title: "",
    description: "",
    releaseDate: "",
  });

  useEffect(() => {
    dispatch(getFilm());
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setfilmData({ ...filmData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (false === isUpdate) {
      dispatch(postFilm(filmData));
    } else {
      dispatch(putFilm(filmData));
    }
    setfilmData({
      title: "",
      description: "",
      releaseDate: "",
    });
    setIsUpdate(false);
  };

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="w-[100%] h-[100%] flex">
        <div className="flex flex-[1] h-[100%] justify-center items-center overflow-hidden">
          <div className=" w-[80%] flex flex-col gap-11">
            <div className="flex flex-col gap-5">
              <div className="grid">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Titre du film
                  </label>
                  <input
                    autoFocus={true}
                    type="text"
                    name={"title"}
                    value={filmData.title}
                    onChange={handleChange}
                    placeholder="Titre"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Description
                  </label>
                  <textarea
                    autoFocus={true}
                    type="text"
                    name={"description"}
                    value={filmData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Date de sortie
                  </label>
                  <input
                    autoFocus={true}
                    type="date"
                    name={"releaseDate"}
                    value={filmData.releaseDate}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="w-[100%] h-10 bg-gray-800 border rounded-md text-white hover:bg-slate-400"
                onClick={handleFormSubmit}
              >
                {true !== isUpdate ? "Ajouter" : "Modifier"}
              </button>
              {isUpdate && (
                <button
                  className="w-[100%] h-10 bg-red-500 border rounded-md text-white hover:bg-red-300"
                  onClick={() => {
                    setIsUpdate(false);
                    setfilmData({
                      title: "",
                      description: "",
                      releaseDate: "",
                      id: null,
                    });
                  }}
                >
                  {"Annuler"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-[3] h-[100%] p-[5%] border-l flex-wrap overflow-scroll gap-5">
          {filmList?.map((item, key) => (
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
              <div className="flex gap-5">
                <button
                  className="w-[50%] h-10 bg-gray-800 border rounded-md text-white hover:bg-slate-400"
                  onClick={() => {
                    setfilmData({
                      title: item.title,
                      description: item.description,
                      releaseDate: item.releaseDate.split("T")[0],
                      id: item.id,
                    });
                    setIsUpdate(true);
                  }}
                >
                  {"Modifier"}
                </button>
                <button className="w-[50%] h-10 bg-red-500 border rounded-md text-white hover:bg-red-300" onClick={() => {
                  dispatch(deleteFilm(item.id))
                }}>
                  {"Supprimer"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
