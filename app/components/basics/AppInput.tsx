import React, {FunctionComponent, useContext, useState} from 'react';
import {
    StyleSheet,
    TextInput, TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import AppText from "./AppText";
import { Feather } from "@react-native-vector-icons/feather";
import Colors from "../../constants/Colors";

type AppInputProps = TextInputProps & {
    label?: string;
    labelStyle?: object;
    onChangeText: () => void;
    containerStyle?: object;
    errorMessage?: string;
    borderColor?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    onRightIconPress?: () => void
}
const AppInput: FunctionComponent<AppInputProps> = (
    props: AppInputProps,
) => {
    const {
        label,
        labelStyle = {},
        borderColor,
        secureTextEntry = false,
        style = {},
        containerStyle = {},
        errorMessage,
        rightIcon,
        leftIcon,
        onRightIconPress,
        ...otherProps
    } = props;
    const [isSecured, setIsSecured] = useState<boolean>(secureTextEntry);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const colors = Colors["light"]

    return (
        <View style={{...styles.container, ...containerStyle}}>
            {label && (
                <AppText
                    text={label}
                    style={[styles.label, {color: colors.text}, labelStyle]}
                />
            )}
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: errorMessage
                            ? '#dc2626'
                            : isFocus
                                ? 'rgba(19,61,182,0.6)'
                                : borderColor || '#ececec',
                        backgroundColor: colors.white,
                        color: colors.text,
                        paddingLeft: leftIcon ? 47 : 20,
                        paddingRight: rightIcon ? 47 : 20,
                        fontFamily: "SpaceMono"
                    },
                    style,
                ]}
                placeholderTextColor={colors.text}
                secureTextEntry={isSecured}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...otherProps}
            />
            {leftIcon ? (
                <View
                    style={{
                        position: 'absolute',
                        left: 7,
                        top: label ? 35 : 10,
                    }}>
                    {leftIcon}
                </View>
            ) : null}

            {secureTextEntry && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 15,
                        top: label
                            ? 40
                            : 14,
                    }}
                    onPress={() => setIsSecured(!isSecured)}>
                    <Feather size={30} name="eye"/>
                </TouchableOpacity>
            )}

            {rightIcon && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 15,
                        top: label ? 40 : 14,
                    }}
                    onPress={onRightIconPress}>
                    {rightIcon}
                </TouchableOpacity>
            )}
            <AppText
                text={errorMessage || ' '}
                style={styles.inputErrorMessage}
                color={colors.red}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        paddingBottom: 1,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        height: 60,
        paddingVertical: 0,
        fontSize: 18,
        marginBottom: 0.7,
    },
    inputErrorMessage: {
        fontSize: 13
    }
});

export default AppInput;