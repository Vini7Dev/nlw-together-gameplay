import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import styles from './styles';

interface GuildIconProps {
    urlImage?: string;
}

const GuildIcon: React.FC<GuildIconProps> = ({ urlImage = 'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-icone.png' }) => {
    return (
        <Image
            source={{ uri: urlImage }}
            style={styles.image}
            resizeMode="cover"
        />
    );
}

export default GuildIcon;