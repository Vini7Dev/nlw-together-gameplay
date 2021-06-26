import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import styles from './styles';
import Background from '../../components/Background';
import Profile from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListHeader from '../../components/ListHeader';
import Appointment, { AppointmentData } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import Loading from '../../components/Loading';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [categorySelected, setCagtegorySelected] = useState('');

    const handleCategorySelected = useCallback((categoryId: string) => {
        categoryId === categorySelected
            ? setCagtegorySelected('')
            : setCagtegorySelected(categoryId);
        
            handleLoadAppoointments();
    }, [categorySelected]);

    const handleAppointmentCreate = useCallback(() => {
        navigation.navigate('AppointmentCreate');
    }, [navigation]);

    const handleAppointmentDetails = useCallback((guildSelected: AppointmentData) => {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }, [navigation]);

    const handleLoadAppoointments = useCallback(async () => {
        const appointmentsLoaded = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const appointmentsParsed: AppointmentData[] = appointmentsLoaded
            ? JSON.parse(appointmentsLoaded)
            : [];

        if(categorySelected) {
            setAppointments(appointmentsParsed.filter(appointment => appointment.category === categorySelected));
        } else {
            setAppointments(appointmentsParsed);
        }

        setLoading(false);
    }, [categorySelected]);

    useFocusEffect(useCallback(() => {
        handleLoadAppoointments();
    }, [categorySelected]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            
            <CategorySelect
                categorySelected={categorySelected}
                setCategorySelected={handleCategorySelected}
            />

            {
                loading
                ? <Loading />
                : <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                        <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                        /> 
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                    />
                </>
            }
        </Background>
    );
}

export default Home;
