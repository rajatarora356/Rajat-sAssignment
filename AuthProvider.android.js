import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    
    return (
        <AuthContext.Provider
        value={{
        user,
        setUser,
        login: async (email,password) => {

            try{
                await auth().signInWithEmailAndPassword(email,password);
            } catch(e){
                console.log(e);
            }
        },
        googleLogin: async () => {
            try{
                const { idToken } = await GoogleSignin.signIn();
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                await auth().signInWithCredential(googleCredential); 
            } catch(e){
                console.log(e);
            }
        },
        fbLogin: async () => {
            try{
                    // Attempt login with permissions
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                  
                    if (result.isCancelled) {
                      throw 'User cancelled the login process';
                    }
                    const data = await AccessToken.getCurrentAccessToken();
                  
                    if (!data) {
                      throw 'Something went wrong obtaining access token';
                    }
                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                    await auth().signInWithCredential(facebookCredential);
                  } catch(e){
                      console.log(e);
                  }
        },
        register: async (email,password) => {

            try{
                await auth().createUserWithEmailAndPassword(email,password);
            } catch(e){
                console.log(e);
            }
        },
        logout: async () => {

            try{
                await auth().signOut();
            } catch(e){
                console.log(e);
            }
        },

        }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;