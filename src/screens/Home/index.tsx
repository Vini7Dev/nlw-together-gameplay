import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import styles from './styles';
import Profile from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListHeader from '../../components/ListHeader';
import Appointment from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';

const Home: React.FC = () => {
    const [categorySelected, setCagtegorySelected] = useState('');

    const handleCategorySelected = useCallback((categoryId: string) => {
        categoryId === categorySelected
            ? setCagtegorySelected('')
            : setCagtegorySelected(categoryId);
    }, [categorySelected]);

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
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
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
                       /> 
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.matches}
                />
            </View>
        </View>
    );
}

export default Home;