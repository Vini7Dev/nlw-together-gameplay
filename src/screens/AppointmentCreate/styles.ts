import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        fontSize: 18,
    },
    form: {
        margin: 32,
    },
    select: {
        width: '100%',
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.secondary50,
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 25,
        overflow: 'hidden',
    },
    selectBody: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 64,
        height: 68,
        backgroundColor: theme.colors.secondary40,
        borderColor: theme.colors.secondary50,
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 20,
    },
    field: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginRight: 4,
        fontFamily: theme.fonts.text500,
        color: theme.colors.highlight,
        fontSize: 15,
    },
    caracteresLimit: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        fontSize: 13,
    },
    footer: {
        marginTop: 20,
        marginBottom: 56,
    },
});

export default styles;