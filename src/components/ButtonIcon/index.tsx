import React from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styles from './styles';

import DiscordImg from '../../assets/discord.png';

interface ButtonIconPorps extends RectButtonProps {
    title: string;
}

const ButtonIcon: React.FC<ButtonIconPorps> = ({ title, ...rest }) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} />
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}

export default ButtonIcon;