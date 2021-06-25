import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import AuthRoutes from './auth.routes';
import SignIn from '../screens/SignIn';

const Routes: React.FC = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {
                user.id ? <AuthRoutes /> : <SignIn />
            }
        </NavigationContainer>
    );
}

export default Routes;