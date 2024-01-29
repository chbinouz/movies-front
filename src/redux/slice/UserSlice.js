import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../services/utils/apiRessources";
import { toast } from "react-toastify";

// initiation de l'état initial
const initialState = {
  id: null,
  nom: "",
  prenom: "",
  email: "",
  roles: [],
  favoris: [],
  token: "",
  isLoading: false,
};

// Création du slice user
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Ajout d'un utilisateur dans le store
    setActiveUser: (state, action) => {
        state.id = action.payload.id;
        state.nom = action.payload.nom;
        state.prenom = action.payload.prenom;
        state.email = action.payload.email;
        state.roles = action.payload.roles;
        state.favoris = action.payload.favoris;
    },
    // Ajout du token dans le store
    populateToken: (state, action) => {
        state.token = action.payload;
    },
    // Ajout de la gestion du loader dans le store
    setIsLoading: (state, action) => {
        state.isLoading = action.payload.isLoading;
    }
  },
});

// Création des actions
// dispatchLogin et dispatchSignup sont des fonctions qui retournent une fonction
// On peut donc les utiliser dans les composants
// dispatchMe est une fonction qui retourne une fonction pour assurer la coonnecion d'un utilisateur
export const dispatchLogin = (obj) => (dispatch) => {
    dispatch(setIsLoading({isLoading: true}));
    axios.post(`${BASE_URL}/authentication_token`, obj).then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(populateToken(localStorage.getItem("token")));
        axios.defaults.headers["Authorization"] = "Bearer " + res.data.token;
        dispatch(setIsLoading({isLoading: false}));
        toast.success("Vous êtes connecté");
    }).catch((err) => {
        if (err.response.status === 401) {
            toast.error('Votre email ou mot de passe est incorrect');
        } else {
            toast.error('erreur de connexion');
        }
        dispatch(setIsLoading({isLoading: false}));
    })
}

// dispatchSignup est une fonction qui retourne une fonction pour assurer l'inscription d'un utilisateur
export const dispatchSignup = (obj) => (dispatch) => {
    dispatch(setIsLoading({isLoading: true}));
    axios.post(`${BASE_URL}/api/users`, obj).then((_res) => {
        window.location.pathname = "/login"
        dispatch(setIsLoading({isLoading: false}));
    }).catch((err) => {
        console.log(err);
        dispatch(setIsLoading({isLoading: false}));
    })
}

// dispatchMe est une fonction qui retourne les informations de l'utilisateur connecté
export const dispatchMe = () => (dispatch) => {
    axios.get(`${BASE_URL}/api/me`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        dispatch(setActiveUser(res.data));
    }).catch((err) => {
        console.log(err);
    })
}

// deleteFav est une fonction qui supprime un film des favoris
export const deleteFav = (id) => (dispatch) => {
    axios.delete(`${BASE_URL}/api/favoris/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(() => {
        dispatch(dispatchMe());
    }).catch((err) => {
        console.log(err);
    })
}

// putFavItem est une fonction qui meodifie le rang d'un film dans la liste des favoris
export const putFavItem = (obj) => (dispatch) => {
    const object = {
        owner: `/api/users/${obj.user.id}`,
        movie: `/api/movies/${obj.item.movie.id}`,
        rank: obj.rank - obj.item.rank === 1 ? obj.rank + 1 : obj.rank
    }

    axios.put(`${BASE_URL}/api/favoris/${obj.item.id}`, object, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(() => {
        dispatch(dispatchMe());
    }).catch((err) => {
        console.log(err);
    })
}

// selectToken, selectLoggedUser, selectFavs et selectLoader sont des fonctions qui retournent des valeurs du store
export const selectToken = (state) => {
    return state.user.token;
};

export const selectLoggedUser = (state) => {
    return state.user;
};

export const selectFavs = (state) => {
    return state.user.favoris;
}

export const selectLoader = (state) => {
    return state.user.isLoading;
}

export const { setActiveUser, populateToken, setIsLoading } = UserSlice.actions;
export default UserSlice.reducer;
