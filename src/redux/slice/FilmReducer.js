import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../services/utils/apiRessources";
import { toast } from "react-toastify";

// initiation de l'état initial
const initialState = {
  id: null,
  title: "",
  description: "",
  releaseDate: "",
  filmList: []
};

// Création du slice film
const FilmSlice = createSlice({
  name: "film",
  initialState,
  // Ajout d'un film dans le store
  reducers: {
    populateFilm: (state, action) => {
        state.filmList = action.payload;
    },
    injectFilm: (state, action) => {
        state.filmList.push(action.payload);
    }
  }
});

// Création des actions
// getFilm est une fonction qui récupére la liste des films
export const getFilm = () => (dispatch) => {
    axios.get(`${BASE_URL}/api/movies`,{
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        dispatch(populateFilm(res.data));
    }).catch((err) => {
        console.log(err);
    })
}

// searchFilm est une fonction qui récupére la liste des films en fonction d'un titre
export const searchFilm = (search) => (dispatch) => {
    axios.get(`${BASE_URL}/api/movies?title=${search}`,{
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        dispatch(populateFilm(res.data));
    }).catch((err) => {
        console.log(err);
    })
}

// postFilm est une fonction qui ajoute un film
export const postFilm = (obj) => (dispatch) => {
    axios.post(`${BASE_URL}/api/movies`, obj, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        dispatch(injectFilm(res.data));
    }).catch((err) => {
        console.log(err);
    })
}

// putFilm est une fonction qui modifie un film
export const putFilm = (obj) => (dispatch) => {
    axios.put(`${BASE_URL}/api/movies/${obj.id}`, obj, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(() => {
        dispatch(getFilm());
    }).catch((err) => {
        console.log(err);
    })
}

// addtoFavList est une fonction qui ajoute un film dans la liste des favoris
export const addtoFavList = (obj) => (dispatch) => {
    obj = {
        owner: `/api/users/${obj.owner}`,
        movie: `/api/movies/${obj.film}`
    }

    axios.post(`${BASE_URL}/api/favoris`, obj, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(() => {
        dispatch(getFilm());
        toast.success("Film ajouté aux favoris");
    }).catch((err) => {
        console.log(err);
    })
}

// deleteFilm est une fonction qui supprime un film
export const deleteFilm = (id) => (dispatch) => {
    axios.delete(`${BASE_URL}/api/movies/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(() => {
        dispatch(getFilm());
    }).catch((err) => {
        console.log(err);
    })
}

// selectFilmList est une fonction qui retourne la liste des films
export const selectFilmList = (state) => {
    return state.film.filmList;
}

export const { populateFilm, injectFilm } = FilmSlice.actions;
export default FilmSlice.reducer;
