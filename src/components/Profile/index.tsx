import React, { useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import styles from './styles';
import Avatar from '../Avatar';

const Profile: React.FC = () => {
    const { user, signOut } = useAuth();

    const handleSignOut = useCallback(async () => {
        Alert.alert(
            'Logout',
            'Deseja sair do GamePlay?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: signOut }
            ],
        );
    }, []);

    return (
        <View style={styles.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar
                    urlImage={user.avatar}
                />
            </RectButton>

            <View style={styles.texts}>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    );
}

export default Profile;