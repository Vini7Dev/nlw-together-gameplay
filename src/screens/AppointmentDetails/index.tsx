import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, FlatList, Alert, Share, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { AppointmentData } from '../../components/Appointment';
import styles from './styles';
import theme from '../../global/styles/theme';
import BannerIMG from '../../assets/banner.png';

import api from '../../services/api';
import Loading from '../../components/Loading';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';
import Member, { MemberProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';

interface RouteParams {
    guildSelected: AppointmentData;
}

interface GuildWidget {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

const AppointmentDetails: React.FC = () => {
    const route = useRoute();
    const { guildSelected } = route.params as RouteParams;
    const { primary } = theme.colors;

    const [loading, setLoading] = useState(true);
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

    const handleShareInvitation = useCallback(() => {
        console.log(widget.instant_invite);

        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite;

            Share.share({
                message,
                url: widget.instant_invite,
            });
    }, [widget]);

    const handleOpenGuild = useCallback(() => {
        Linking.openURL(widget.instant_invite);
    }, [widget]);

    const fetchGuildWidget = useCallback(async () => {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

            setWidget(response.data);
        } catch {
            Alert.alert('Verifique as configurações do servidor. Será que o widget está habilitado?');

            setWidget({
                id: 'NOT-AVAILABLE',
                instant_invite: '',
                members: [],
                name: 'NOT-AVAILABLE',
            });
        } finally {
            setLoading(false);
        }
    }, [guildSelected]);

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header title="Detalhes" action={
                guildSelected.guild.owner &&
                <BorderlessButton onPress={handleShareInvitation}>
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
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading
                ? <Loading />
                : <>
                    <ListHeader
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Member
                                id={item.id}
                                username={item.username}
                                avatar_url={item.avatar_url}
                                status={item.status}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>}
                        style={styles.member}
                    />
                </>
            }
            {
                widget.instant_invite &&
                <View style={styles.footer}>
                    <ButtonIcon
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />
                </View>
            }
        </Background>
    );
}

export default AppointmentDetails;