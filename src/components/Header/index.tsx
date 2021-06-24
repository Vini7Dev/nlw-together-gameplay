import React, { useCallback } from 'react';
import { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import theme from '../../global/styles/theme';

interface HeaderProps {
    title: string;
    action?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, action }) => {
    const navigation = useNavigation();
    const {secondary40, secondary100, heading} = theme.colors;

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary100, secondary40]}
        >
            <BorderlessButton onPress={handleGoBack}>
                <Feather
                    name="arrow-left"
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            {
                action && <View>
                    { action }
                </View>
            }
        </LinearGradient>
    );
}

export default Header;