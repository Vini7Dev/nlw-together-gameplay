import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Avatar from '../Avatar';
import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Avatar
                urlImage={user.avatar}
            />

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