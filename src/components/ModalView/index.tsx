import React from 'react';
import { View, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import Background from '../Background';

interface ModalViewProps extends ModalProps{
    closeModal(): void;
}

const ModalView: React.FC<ModalViewProps> = ({ children, closeModal, ...rest }) => {
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar} />

                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalView;