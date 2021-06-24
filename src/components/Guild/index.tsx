import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import GuildIcon from '../GuildIcon';
import theme from '../../global/styles/theme';

export interface GuildProps extends TouchableOpacityProps {
    id: string;
    name: string;
    icon?: string;
    owner: boolean;
}

const Guild: React.FC<GuildProps> = ({
    id,
    name,
    icon,
    owner,
    ...rest
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            {...rest}
        >
            <GuildIcon
                urlImage={icon}
            />
            
            <View style={styles.content}>
                <View >
                    <Text style={styles.title}>
                        { name }
                    </Text>

                    <Text style={styles.type}>
                        { owner ? 'Administrador' : 'Convidado' }
                    </Text>
                </View>
            </View>

            <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    );
}

// 49:00

export default Guild;