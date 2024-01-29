import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import {
  deleteFav,
  dispatchMe,
  putFavItem,
  selectFavs,
  selectLoggedUser,
} from "../../redux/slice/UserSlice";
import { useEffect, useState } from "react";

const MyFavsPage = () => {
  const favsList = useSelector(selectFavs);
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const [itemPosition, setItemPosition] = useState();

  useEffect(() => {
    dispatch(dispatchMe());
  }, [dispatch]);

  return (
    <>
      <Navbar isLoggedIn={true} />
      {favsList.length === 0 ? (
        <div className="h-[100%] flex justify-center">
          <p className="mt-[20%]">liste des favoris est vide</p>
        </div>
      ) : (
        <div className="max-h-[100%] h-[100%] flex flex-col items-center gap-5 pt-[3%] pb-[5%] overflow-scroll">
          {favsList
            ?.slice()
            ?.sort((a, b) => a.rank - b.rank)
            ?.map((item, key) => (
              <div
                className="w-[50%] h-fit bg-gray-100 border rounded-md p-[1%] flex flex-col gap-5"
                draggable={true}
                onDragEnd={() => {
                  dispatch(
                    putFavItem({
                      item: item,
                      rank: itemPosition,
                      user: loggedUser,
                    })
                  );
                }}
                onDragOver={() => {
                  setItemPosition(key);
                }}
                key={key}
              >
                <div className="flex gap-5 p-[2%]">
                  <div className="flex justify-center items-center">
                  <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.44765 0.0800846C8.33983 0.0913347 8.23952 0.139146 8.16265 0.215085L6.00265 2.37508C5.9089 2.46415 5.85546 2.58696 5.85358 2.7154C5.85171 2.84478 5.9014 2.96853 5.99233 3.0604C6.08327 3.15228 6.20702 3.20384 6.33546 3.2029C6.46483 3.2029 6.58765 3.1504 6.67765 3.05759L8.02016 1.71508V7.5202H2.21504L3.55756 6.17769C3.71037 6.03425 3.75256 5.8083 3.66162 5.61894C3.57068 5.43051 3.36723 5.32269 3.16007 5.35269C3.05413 5.36769 2.95663 5.41831 2.88258 5.49519L0.722578 7.65519C0.63164 7.74519 0.580078 7.868 0.580078 7.99644C0.580078 8.12489 0.63164 8.2477 0.722578 8.3377L2.88258 10.4977C2.97258 10.5905 3.09539 10.643 3.22477 10.643C3.35321 10.644 3.47696 10.5924 3.5679 10.5005C3.65884 10.4086 3.70852 10.2849 3.70665 10.1555C3.70477 10.0271 3.65133 9.90426 3.55759 9.81519L2.21507 8.48019H8.02019V14.2776L6.67768 12.9351C6.57643 12.8311 6.433 12.7786 6.28768 12.7926C6.10112 12.8104 5.94175 12.9361 5.88081 13.1132C5.81893 13.2914 5.86675 13.4882 6.00268 13.6176L8.16268 15.7776C8.34925 15.9623 8.65113 15.9623 8.83768 15.7776L10.9977 13.6176C11.0914 13.5286 11.1449 13.4057 11.1467 13.2773C11.1486 13.1479 11.0989 13.0242 11.008 12.9323C10.9171 12.8404 10.7933 12.7889 10.6649 12.7898C10.5355 12.7898 10.4127 12.8423 10.3227 12.9351L8.98016 14.2776V8.48019H14.7853L13.4428 9.81519C13.349 9.90425 13.2956 10.0271 13.2937 10.1555C13.2918 10.2849 13.3415 10.4086 13.4325 10.5005C13.5234 10.5924 13.6471 10.6439 13.7756 10.643C13.905 10.643 14.0278 10.5905 14.1178 10.4977L16.2778 8.33769C16.3687 8.24769 16.4203 8.12488 16.4203 7.99644C16.4203 7.86799 16.3687 7.74518 16.2778 7.65518L14.1178 5.49518C14.0165 5.39112 13.8731 5.33862 13.7278 5.35268C13.5412 5.37049 13.3818 5.49612 13.3209 5.6733C13.259 5.85142 13.3068 6.0483 13.4428 6.17768L14.7853 7.52019H8.98018V1.71507L10.3227 3.05758C10.4127 3.1504 10.5355 3.2029 10.6649 3.2029C10.7933 3.20384 10.9171 3.15227 11.008 3.0604C11.0989 2.96852 11.1486 2.84477 11.1468 2.7154C11.1449 2.58696 11.0914 2.46414 10.9977 2.37508L8.83769 0.215077C8.73457 0.113826 8.59109 0.0641462 8.44765 0.0800846Z"
                    fill="black"
                  />
                </svg>
                  </div>
                <div>
                <div className="flex gap-5">
                  <h2 className="font-bold">Titre:</h2>
                  <p>{item.movie.title}</p>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold self-start">Description:</h2>
                  <p className="text-justify">{item.movie.description}</p>
                </div>
                <div className="flex gap-5">
                  <h2 className="font-bold">Date de sortie:</h2>
                  <p>{item.movie.releaseDate.split("T")[0]}</p>
                </div>
                </div>
                </div>

                <div className="w-[100%] flex justify-center">
                  <button
                    className="w-[50%] h-10 bg-red-500 border rounded-md text-white hover:bg-red-300"
                    onClick={() => {
                      dispatch(deleteFav(item.id));
                    }}
                  >
                    {"Supprimer"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default MyFavsPage;
