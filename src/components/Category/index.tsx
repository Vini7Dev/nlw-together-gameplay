import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import theme from '../../global/styles/theme';

interface CategoryProps extends RectButtonProps {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
}

const Category: React.FC<CategoryProps> = ({
    title,
    icon: Icon,
    checked = false,
    ...rest
}) => {
    const { secondary50, secondary70 } = theme.colors;

    return (
        <RectButton {...rest}>
            <LinearGradient style={[styles.container, { opacity: checked ? 1 : 0.4 }]}
                colors={[secondary50, secondary70]}
            >
                <View style={styles.content}>
                    <View style={ checked ? styles.checked : styles.check } />
                    
                    <Icon width={48} height={48} />
                    
                    <Text style={styles.title}>
                        { title }
                    </Text>
                </View>
            </LinearGradient>
        </RectButton>
    );
}

export default Category;