import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/Validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { user_photoURL } from "../utils/constants";

const Login = () => {
    const [isSignInForm,setisSignInForm] = useState(true);
    const [errormessage, seterrormessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () =>{
        // validate the form data
        console.log(email.current.value);
        console.log(password.current.value);

        const message = checkValidateData(email.current.value,password.current.value);
        seterrormessage(message);
        if (message) return;

        // sign in / sign up logic
        if(!isSignInForm)
        {
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value , 
                        photoURL: user_photoURL
                      }).then(() => {

                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({ uid:uid , email:email, displayName:displayName, photoURL:photoURL }));

                      }).catch((error) => {
                        seterrormessage(error.message);
                      });

                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    seterrormessage(errorCode + "-" + errorMessage);
                });
        }
        else{
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrormessage(errorCode + "-" + errorMessage);
            });
        }
    }

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }

    return(
        <div>
            <Header/>

            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/80a8277e-14eb-4192-83f7-45c27cd0652b/US-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_99b9a7c9-7791-4a48-b335-09e8ee246500_small.jpg" alt="bg-image" />
            </div>

            <form onSubmit={(e) => e.preventDefault()} action="" className="w-1/4 absolute p-12 bg-black    bg-opacity-76 my-36 mx-auto right-0 left-0 text-white rounded-md">

                <h1 className="font-bold py-5 text-3xl">{isSignInForm? "Sign In": "Sign Up"}</h1>

                {!isSignInForm && <input ref={name} type="Name" placeholder="Full Name" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80 "/>}

                <input ref={email} type="Email Address" placeholder="Email or Mobile Number" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80 "/>

                <input ref={password} type="password" placeholder="Password" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80"/>

                <p className="text-red-600 font-bold py-1">{errormessage}</p>

                <button className="p-3 my-3 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isSignInForm? "Sign In": "Sign Up"}</button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now.": "Already registered? Sign In Now."}</p>

            </form>

        </div>
    );
};

export default Login;