import React from 'react';
import { View, Text, ImageBackground, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import styles from './styles';
import theme from '../../global/styles/theme';
import BannerIMG from '../../assets/banner.png';

import Background from '../../components/Background';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import Member from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';

const AppointmentDetails: React.FC = () => {
    const { primary } = theme.colors;

    const players = [
        {
            id: '1',
            username: 'Vinícius',
            avatar_url: 'https://github.com/Vinícius7Dev.png',
            status: 'online',
        },
        {
            id: '2',
            username: 'Gabriel',
            avatar_url: 'https://github.com/Vinícius7Dev.png',
            status: 'offline',
        },
    ];

    return (
        <Background>
            <Header title="Detalhes" action={
                <BorderlessButton>
                    <Fontisto
                        name="share"
                        color={primary}
                        size={24}
                    />
                </BorderlessButton>
            } />

            <ImageBackground
                source={BannerIMG}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>

                    <Text style={styles.subtitle}>
                        Subtítulo...
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />

            <FlatList
                data={players}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member
                        id={item.id}
                        username={item.username}
                        avatar_url={item.avatar_url}
                        status={item.status}
                    />
                )}
                ItemSeparatorComponent={ListDivider}
                style={styles.member}
            />

            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na partida"
                />
            </View>
        </Background>
    );
}

export default AppointmentDetails;