import {ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import AppText from "./AppText";
import Colors from "../../constants/Colors";

type PropsType = {
    onPress: () => void,
    title: string,
    isLoading?: boolean,
    loadingSize?: number | "large" | "small"
    buttonColor?: string,
    titleStyle?: TextStyle,
    titleColor?: string,
    containerStyle?: ViewStyle,
}

const AppButton = (props: PropsType) => {
    const colors = Colors["light"]
    const {
        onPress,
        isLoading,
        loadingSize = "small",
        title,
        titleStyle,
        buttonColor = colors.primary,
        containerStyle,
        titleColor = colors.white
    } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {backgroundColor: buttonColor}, containerStyle]}
            disabled={isLoading}
        >
            {isLoading ? <ActivityIndicator size={loadingSize} color={titleColor}/> :
                <AppText color={titleColor} style={[styles.titleStyle, titleStyle]} text={title}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0000ff",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 10,
    },
    titleStyle: {
        fontWeight: "bold"
    }
})

export default AppButton