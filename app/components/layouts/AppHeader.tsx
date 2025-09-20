import {ReactNode} from "react";
import {StyleSheet, TextStyle, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import AppText from "../basics/AppText";
import {screenHP} from "../../styles";
import {useNavigation} from '@react-navigation/native';
import {Feather} from "@react-native-vector-icons/feather";


type AppHeaderProps = {
    title: string;
    titleStyle?: TextStyle;
    showBackIcon?: boolean;
    RightIcon?: ReactNode
    LeftIcon?: ReactNode
    onRightPress?: () => void;
    onLeftPress?: () => void;
}

const AppHeader = (props: AppHeaderProps) => {
    const {title, titleStyle, showBackIcon = true, RightIcon, onRightPress, LeftIcon, onLeftPress} = props;
    const navigation = useNavigation();
    const colors = Colors["light"]

    const renderRightIcon = () => {
        if (RightIcon) {
            return (
                <TouchableOpacity onPress={onRightPress ? () => onRightPress() : undefined}>
                    {RightIcon}
                </TouchableOpacity>
            )
        }
        if (showBackIcon) return <View style={{width: 30}}></View>
        return null
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.primary}]}>
            <View>
                {showBackIcon ? (
                    <TouchableOpacity onPress={onLeftPress ? () => onLeftPress() : () => navigation.goBack()}>
                        {LeftIcon ? LeftIcon : <Feather name="arrow-left" size={30} color={colors.white}/>}
                    </TouchableOpacity>
                ) : null}
            </View>
            <AppText color={colors.white} style={{...styles.title, ...titleStyle}} text={title}/>
            <View>
                {renderRightIcon()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        alignItems: "center",
        justifyContent: 'space-between',
        paddingTop: 5,
        flexDirection: 'row',
        paddingHorizontal: screenHP
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.7,
        fontFamily: "SpaceMonoBold",
    }
})

export default AppHeader