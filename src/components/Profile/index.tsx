import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Avatar from '../Avatar';

const Profile: React.FC = () => {
    return (
        <View style={styles.container}>
            <Avatar
                urlImage="https://github.com/Vinicius7Dev.png"
            />

            <View style={styles.texts}>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        Vinícius
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