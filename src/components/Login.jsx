import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm,setisSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }

    return(
        <div>
            <Header/>

            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/80a8277e-14eb-4192-83f7-45c27cd0652b/US-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_99b9a7c9-7791-4a48-b335-09e8ee246500_small.jpg" alt="bg-image" />
            </div>

            <form action="" className="w-1/4 absolute p-12 bg-black bg-opacity-76 my-36 mx-auto right-0 left-0 text-white rounded-md">
                <h1 className="font-bold py-5 text-3xl">{isSignInForm? "Sign In": "Sign Up"}</h1>
                {!isSignInForm && <input type="Name" placeholder="Full Name" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80 "/>}
                <input type="Email Address" placeholder="Email or Mobile Number" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80 "/>
                <input type="password" placeholder="Password" className="p-4 my-2 w-full rounded-md bg-gray-600 bg-opacity-80"/>
                <button className="p-3 my-3 bg-red-700 w-full rounded-md">{isSignInForm? "Sign In": "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now.": "Already registered? Sign In Now."}</p>
            </form>

        </div>
    );
};

export default Login;