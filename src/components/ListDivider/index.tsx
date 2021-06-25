import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface ListDividerProps {
    isCentered?: boolean;
}

const ListDivider: React.FC<ListDividerProps> = ({ isCentered }) => {
    return (
        <View style={[
            styles.container,
            isCentered ? { marginVertical: 12 } : { marginTop: 2, marginBottom: 31 }
        ]} />
    );
}

export default ListDivider;