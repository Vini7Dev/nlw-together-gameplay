import React, { useCallback } from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

import styles from './styles';
import theme from '../../global/styles/theme';
import IllustrationIMG from '../../assets/illustration.png';

import Background from '../../components/Background';
import ButtonIcon from '../../components/ButtonIcon';

const SignIn: React.FC = () => {
    const { signIn, loading } = useAuth();
    
    const handleSignIn = useCallback(async () => {
        try {
            await signIn();
        } catch(error) {
            Alert.alert(error);
        }
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


                    {
                        loading
                        ? <ActivityIndicator color={theme.colors.primary} />
                        : <ButtonIcon
                            title="Entre com o Discord"
                            onPress={handleSignIn}
                        />
                    }
                </View>
            </View>
        </Background>
    );
}

export default SignIn;
