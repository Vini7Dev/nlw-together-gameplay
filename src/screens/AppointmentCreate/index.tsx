import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import theme from '../../global/styles/theme';
import styles from './styles';

import Guilds from '../Guilds';
import GuildIcon from '../../components/GuildIcon';
import { GuildProps } from '../../components/Guild';
import ModalView from '../../components/ModalView';
import Header from '../../components/Header';
import CategorySelect from '../../components/CategorySelect';
import SmallInput from '../../components/SmallInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Background from '../../components/Background';

const AppointmentCreate: React.FC = () => {
    const navigation = useNavigation();
    const [openGuildsModal, setOpenGuildsModal] = useState(false);

    const [categorySelected, setCategorySelected] = useState('');
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');
    
    const handleCategorySelected = useCallback((categoryId: string) => {
        setCategorySelected(categoryId);
    }, [categorySelected]);

    const handleOpenGuildsModal = useCallback(() => {
        setOpenGuildsModal(true);
    }, [openGuildsModal]);

    const handleCloseGuildsModal = useCallback(() => {
        setOpenGuildsModal(false);
    }, [openGuildsModal]);
    
    const handleGuildSelected = useCallback((guildSelected: GuildProps) => {
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }, []);

    const handleSaveAppointment = useCallback(async () => {
        const appointment = {
            id: uuid.v4(),
            guild,
            category: categorySelected,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description,
        };

        const appointmentsSaved = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const appointmentsParsed = appointmentsSaved
            ? JSON.parse(appointmentsSaved) : [];

        await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([
            ...appointmentsParsed,
            appointment,
        ]));

        navigation.navigate('Home');
    }, [guild, guild, day, month, hour, minute, description, navigation]);

    return (
        <KeyboardAvoidingView
            behavior={
                Platform.OS === 'ios' ? 'padding' : 'height'
            }
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header title="Agendar partida" />

                    <Text style={[
                        styles.label,
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 },
                    ]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        categorySelected={categorySelected}
                        setCategorySelected={handleCategorySelected}
                        hasCheckBox
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuildsModal}>
                            <View style={styles.select}>
                                {
                                    guild.id
                                        ? <GuildIcon
                                            guildId={guild.id}
                                            iconId={guild.icon}
                                        />
                                        : <View style={styles.image} />
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {
                                            guild.name
                                                ? guild.name
                                                : 'Selecione um servidor'
                                        }
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[
                                    styles.label,
                                    { marginBottom: 12 },
                                ]}>
                                    Dia e mês
                                </Text>
                                
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[
                                    styles.label,
                                    { marginBottom: 12 },
                                ]}>
                                    Hora e minuto
                                </Text>
                                
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button
                                title="Agendar"
                                onPress={handleSaveAppointment}
                            /> 
                        </View>
                    </View>
                </ScrollView>
            </Background>
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuildsModal}>
                <Guilds handleGuildSelected={handleGuildSelected} />
            </ModalView>
        </KeyboardAvoidingView>
    );
}

export default AppointmentCreate;