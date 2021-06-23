import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    image: {
        width: '100%',
        height: 360,
    },
    content: {
        marginTop: -40,
        paddingHorizontal: 50,
    },
    title: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 40,
        lineHeight: 40,
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: theme.fonts.title500,
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 25,
        marginBottom: 64,
    },
});