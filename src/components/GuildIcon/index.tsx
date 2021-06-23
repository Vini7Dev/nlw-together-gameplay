import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import styles from './styles';

interface GuildIconProps {
    urlImage?: string;
}

const GuildIcon: React.FC<GuildIconProps> = ({ urlImage = 'https://toppng.com/uploads/preview/discord-logo-png-discord-ico-11562937135cilktsftux.png' }) => {
    return (
        <Image
            source={{ uri: urlImage }}
            style={styles.image}
            resizeMode="cover"
        />
    );
}

export default GuildIcon;