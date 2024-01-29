import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSignup, selectLoader } from "../../redux/slice/UserSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoader);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [credentials, setCredentials] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(dispatchSignup(credentials))
  };

  useEffect(() => {
    if (credentials.email !== "" && credentials.password !== "" && credentials.nom !== "" && credentials.prenom !== "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [credentials]);

    return (
      <>
        <Navbar />
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <div className="flex flex-col gap-11 p-[3%] border rounded-md border-gray-700">
            <div className="flex flex-col gap-5">
            <div className="grid">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Nom
                  </label>
                  <input
                    autoFocus={true}
                    type="text"
                    name={"nom"}
                    value={credentials.nom}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            <div className="grid">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Prenom
                  </label>
                  <input
                    autoFocus={true}
                    type="text"
                    name={"prenom"}
                    value={credentials.prenom}
                    onChange={handleChange}
                    placeholder="Prenom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Email
                  </label>
                  <input
                    autoFocus={true}
                    type="text"
                    name={"email"}
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex flex-col gap-5">
                  <label className="block font-clashGrotesk font-medium self-start">
                    Mot de passe
                  </label>
                  <input
                    autoFocus={true}
                    type="password"
                    name={"password"}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-light outline-none transition focus:border-black active:border-black disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
                <button className={`w-[100%] h-10 ${false === isSubmitDisabled ? 'bg-gray-800' : 'bg-slate-400'} border rounded-md text-white hover:bg-slate-400`} disabled={isSubmitDisabled} onClick={handleFormSubmit}>{"S'inscrire"}</button>
                {isLoading && (
              <div className="w-[100%] flex justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
                <p className="self-start">{"Avez vous un compte?"}</p>
                <Link to={"/login"} className="text-sky-600 self-start border-b hover:text-sky-300">Se conecter</Link>
            </div>
          </div>
        </div>
        </>
      );
}

export default SignupPage