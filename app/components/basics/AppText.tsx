import {Text, type TextProps, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";

export type AppTextProps = TextProps & {
    text: string | number;
    color?: string;
};

const AppText = ({text, color, style, ...rest}: AppTextProps) => {
    const colors = Colors["light"]

    return (
        <Text
            style={[styles.default, style && style, {color: color || colors.text}]} {...rest}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SpaceMono"
    }
})


export default AppText