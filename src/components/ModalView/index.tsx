import React from 'react';
import { View, Modal, ModalProps } from 'react-native';

import styles from './styles';
import Background from '../Background';

const ModalView: React.FC<ModalProps> = ({ children, ...rest }) => {
    return (
        <Modal
            transparent
            animationType="slide"
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        <View style={styles.bar} />

                        {children}
                    </Background>
                </View>
            </View>
        </Modal>
    );
}

export default ModalView;