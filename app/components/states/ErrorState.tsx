import {StyleSheet, View} from "react-native";
import AppText from "../basics/AppText";
import AppButton from "../basics/AppButton";
import {screenHP} from "../../styles";

type Props = {
    message?: string,
    onReload?: () => void,
}

const ErrorState = (props: Props) => {
    const {
        message, onReload = () => {
        }
    } = props
    return (
        <View style={styles.container}>
            <AppText style={{marginBottom: 8, fontWeight: "bold", fontSize: 17}} text="Il y a eu une erreur ☹️"/>
            {message ? <AppText style={{marginBottom: 15, fontStyle: "italic"}} text={message}/> : null}
            <AppButton onPress={onReload} title="Ressayez"/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: screenHP
    },
})

export default ErrorState;