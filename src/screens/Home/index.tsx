import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import Background from '../../components/Background';
import Profile from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListHeader from '../../components/ListHeader';
import Appointment from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';


const Home: React.FC = () => {
    const navigation = useNavigation();
    const [categorySelected, setCagtegorySelected] = useState('');

    const handleCategorySelected = useCallback((categoryId: string) => {
        categoryId === categorySelected
            ? setCagtegorySelected('')
            : setCagtegorySelected(categoryId);
    }, [categorySelected]);

    const handleAppointmentCreate = useCallback(() => {
        navigation.navigate('AppointmentCreate');
    }, [navigation]);

    const handleAppointmentDetails = useCallback(() => {
        navigation.navigate('AppointmentDetails');
    }, [navigation]);

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendário',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'Descrição...',
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendário',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'Descrição...',
        },
    ];

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

            <View style={styles.content}>
                <ListHeader
                    title="Partidas agendadas"
                    subtitle="Total 6"
                />

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                       <Appointment
                            data={item}
                            onPress={handleAppointmentDetails}
                       /> 
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.matches}
                />
            </View>
        </Background>
    );
}

export default Home;