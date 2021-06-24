import React from 'react';
import {
    View,
    FlatList
} from 'react-native';

import styles from './styles';
import Guild, { GuildProps } from '../../components/Guild';
import ListDivider from '../../components/ListDivider';

interface GuildsProps {
    handleGuildSelected(guildSelected: GuildProps): void;
}

const Guilds: React.FC<GuildsProps> = ({
    handleGuildSelected,
}) => {
    const guilds = [
        {
            id: '1',
            name: 'Guild 1',
            icon: undefined,
            owner: true,
        },
        {
            id: '2',
            name: 'Guild 2',
            icon: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-5.png',
            owner: false,
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
            style={styles.guilds}
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Guild
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        icon={item.icon}
                        owner={item.owner}
                        onPress={() => handleGuildSelected(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={ListDivider}
            />
        </View>
    );
}

export default Guilds;