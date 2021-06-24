import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import theme from '../../global/styles/theme';

import Avatar from '../../components/Avatar';

export interface MemberProps {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}

const Member: React.FC<MemberProps> = ({
    id,
    username,
    avatar_url,
    status,
}) => {
    const isOnline = status === 'online';
    const { on, primary } = theme.colors;

    return (
        <View style={styles.container}>
            <Avatar urlImage={avatar_url} />

            <View>
                <Text style={styles.title}>
                    { username }
                </Text>
                
                <View style={styles.status}>
                    <View
                        style={[
                            styles.bullet,
                            { backgroundColor: isOnline ? on : primary }
                        ]}
                    />

                    <Text style={styles.nameStatus}>
                        { isOnline ? 'Disponível' : 'Ocupado' }
                    </Text>
                </View>
            </View>
        </View>
    );
}

// 49:00

export default Member;