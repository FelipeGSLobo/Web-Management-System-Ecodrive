import "../.firebase/config";

import {
    getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	sendPasswordResetEmail,
	sendEmailVerification,
	reauthenticateWithCredential,
	updatePassword,
	EmailAuthProvider,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () =>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // memory leak
    const [canceled, setCanceled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if(canceled) return;
    }

    //Register
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            ); // Create User
            await updateProfile(user, {displayName: data.name}); // Define Username
            setLoading(false);
            setError(null);
            return user;
        } catch (e) {
            let msg;
            if(e.message.includes("Password"))
                msg = "A senha precisa conter pelo menos 6 caracteres.";
            else if (e.message.includes("email-already"))
                msg = "Este email já está cadastrado.";
            else 
                msg = "Ocorreu um erro, por favor tente novamente mais tarde.";
            setError(msg);
        }
        setLoading(false);
    }




    useEffect(() => {
        return () => setCanceled(true);
    }, [])

    return {
        auth, error, loading, createUser
    }

}