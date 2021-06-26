import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    FlatList
} from 'react-native';

import styles from './styles';
import Guild, { GuildProps } from '../../components/Guild';
import ListDivider from '../../components/ListDivider';
import Loading from '../../components/Loading';
import api from '../../services/api';

interface GuildsProps {
    handleGuildSelected(guildSelected: GuildProps): void;
}

const Guilds: React.FC<GuildsProps> = ({
    handleGuildSelected,
}) => {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {
                loading
                ? <Loading />
                : <FlatList
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
                    contentContainerStyle={{ paddingBottom: 69, paddingTop: 103 }}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    ListHeaderComponent={() => <ListDivider isCentered />}
                />
            }
        </View>
    );
}

export default Guilds;