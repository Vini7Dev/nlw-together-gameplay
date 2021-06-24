import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import IllustrationIMG from '../../assets/illustration.png';

import Background from '../../components/Background';
import ButtonIcon from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    const handleSignIn = useCallback(() => {
        navigation.navigate('Home');
    }, []);
    
    return (
        <Background>
            <View style={styles.container}>
                <Image
                    source={IllustrationIMG}
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se e{`\n`}
                        organize suas{`\n`}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon
                        title="Entre com o Discord"
                        onPress={handleSignIn}
                    />
                </View>
            </View>
        </Background>
    );
}

export default SignIn;
