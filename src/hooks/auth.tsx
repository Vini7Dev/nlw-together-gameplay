import React, { createContext, useContext, useState, useCallback } from 'react';
import * as AuthSession from 'expo-auth-session';
import {
    CDN_IMAGE,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE,
} from '../configs';
import api from '../services/api';

interface UserProps {
    id: string;
    username: string;
    firstName: string;
    email: string;
    avatar: string;
}

interface AuthProviderProps {
    user: UserProps;
    signIn(): Promise<void>;
    loading: boolean;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string;
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

    const signIn = useCallback(async () => {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if(type === 'success') {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                
                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token,
                });
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch(error) {
            throw new Error('Não foi possível autenticar.');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
