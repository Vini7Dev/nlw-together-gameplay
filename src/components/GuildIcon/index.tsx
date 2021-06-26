import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';
import DiscordSVG from '../../assets/discord.svg';

interface GuildIconProps {
    guildId: string;
    iconId: string | null;
}

const { CDN_IMAGE } = process.env;

const GuildIcon: React.FC<GuildIconProps> = ({ guildId, iconId }) => {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

    return (
        <View style={styles.container}>
            {
                iconId
                ? <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                : <DiscordSVG
                    width={40}
                    height={40}
                />
            }
        </View>
    );
}

export default GuildIcon;