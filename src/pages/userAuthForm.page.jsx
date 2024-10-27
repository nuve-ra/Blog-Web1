import { useContext, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { UserContext } from "../App";
import { storeInSession } from "../common/session";
import authWithGoogle from "../common/firebase";
import React from "react";

const UserAuthForm = ({ type }) => {
    const { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
    const authForm = useRef();

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${serverRoute}`, formData)
            .then((response) => {
                const data = response.data;
                storeInSession("user", JSON.stringify(data));
                setUserAuth(data);
            })
            .catch(({ response }) => {
                const errorMessage = response?.data?.error || "An error occurred";
                toast.error(errorMessage);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let serverRoute = type === "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // Create FormData from the form reference
        const formData = new FormData(authForm.current);

        // Create a data object from FormData
        let formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        let { fullname, email, password } = formObject;

        // Form data validation
        if (type !== "sign-in" && (!fullname || fullname.length < 3)) {
            return toast.error("Full name must be at least 3 letters long");
        }
        if (!email.length) {
            return toast.error("Enter email");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be at least 6-20 letters and contain 1 uppercase and 1 lowercase letter");
        }

        userAuthThroughServer(serverRoute, formObject);
    };

    const handleGoogleAuth = (e) => {
        e.preventDefault();
        authWithGoogle().then(user => {
            let serverRoute = "/google-auth";
            let formData = {
                access_token: user.accessToken
            }

            userAuthThroughServer(serverRoute, formData);
        })
        .catch(err => {
            toast.error('Trouble logging in through Google');
            console.log(err);
        });
    };

    return (
        access_token ? <Navigate to="/" /> : (
            <section className="h-cover flex items-center justify-center">
                <Toaster />
                <form ref={authForm} className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24 ">
                        {type === "sign-in" ? "Welcome Back" : "Join us Today"}
                    </h1>
                    {type !== "sign-in" && (
                        <InputBox name="fullname" type="text" placeholder="Full Name" icon="fi-rr-user" />
                    )}
                    <InputBox name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
                    <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />
                    <button className="btn-dark center mt-14" type="submit">
                        {type.replace("-", "")}
                    </button>
                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        or
                        <hr className="w-1/2 border-black" />
                    </div>
                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
                        <img src={googleIcon} className="w-5" />
                        Sign in with Google
                    </button>
                    {type === "sign-in" ? (
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an account?
                            <Link to="/signup" className="underline text-color text-xl ml-1">Join us today.</Link>
                        </p>
                    ) : (
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already have an account?
                            <Link to="/signin" className="underline text-color text-xl ml-1">Sign in</Link>
                        </p>
                    )}
                </form>
            </section>
        )
    );
};

export default UserAuthForm;
