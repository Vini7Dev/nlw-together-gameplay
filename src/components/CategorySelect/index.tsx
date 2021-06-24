import React from 'react';
import { ScrollView } from 'react-native';

import styles from './styles';
import categories from '../../utils/categories';
import Category from '../Category';

interface CategorySelectProps {
    categorySelected: string;
    setCategorySelected(categoryId: string): void;
    hasCheckBox?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
    categorySelected,
    setCategorySelected,
    hasCheckBox = false,
}) => {
    return (
        <ScrollView
            style={styles.container}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 48 }}
        >
            {
              categories.map(category => (
                  <Category
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => setCategorySelected(category.id)}
                    hasCheckBox={hasCheckBox}
                  />
              ))  
            }
        </ScrollView>
    );
}

export default CategorySelect;