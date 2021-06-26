import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

const { CDN_IMAGE } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

interface UserProps {
    id: string;
    username: string;
    firstName: string;
    email: string;
    avatar: string;
    token: string;
}

interface AuthProviderProps {
    user: UserProps;
    signIn(): Promise<void>;
    signOut(): Promise<void>
    loading: boolean;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    return authContext;
}

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadUserDataFromStorage = async () => {
            const userAuthenticated = await AsyncStorage.getItem(COLLECTION_USERS);

            if(userAuthenticated) {
                const userData = JSON.parse(userAuthenticated) as UserProps;

                api.defaults.headers.authorization = `Bearer ${userData.token}`;
                
                setUser(userData);
            }
        }

        loadUserDataFromStorage();
    }, []);

    const signIn = useCallback(async () => {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if(type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                
                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token,
                };

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

                setUser(userData);
            }
        } catch(error) {
            throw new Error('Não foi possível autenticar.');
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        setUser({} as UserProps);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
