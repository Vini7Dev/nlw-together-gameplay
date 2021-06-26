import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from '../../global/styles/theme';

import styles from './styles';

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={theme.colors.primary}
            />
        </View>
    );
}

export default Loading;