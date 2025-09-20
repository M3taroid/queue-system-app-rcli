
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicke from 'react-native-date-picker';
import moment from 'moment';
import {Colors} from "../../constants";
import {AppText} from "../index.ts";
import {Feather} from "@react-native-vector-icons/feather";

type Props = {
    placeholder: {
        value: string;
        display: boolean;
        color: {true: string; false: string};
    };
    onConfirm: (date: Date) => void;
    value?: Date;
    containerStyle?: Object;
    label?: string;
    labelStyle?: Object;
    errorMessage?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    checkMajority?: boolean;
};

const AppDatePicker: React.FC<Props> = ({
                                            placeholder,
                                            onConfirm,
                                            value,
                                            containerStyle,
                                            label,
                                            labelStyle,
                                            errorMessage,
                                            minimumDate,
                                            maximumDate,
                                            checkMajority,
                                        }) => {
    let constumDate = '';
    if (value) {
        constumDate = moment(value).format('DD-MM-YYYY');
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const colors = Colors["light"];

    const majorityYear = parseInt(moment().format('YYYY'), 10) - 18;

    const onValidate = (v: Date) => {
        setIsOpen(false);
        onConfirm(v);
    };

    return (
        <View style={{...styles.container, ...containerStyle}}>
            {label && (
                <AppText text={label} style={{...styles.label, ...labelStyle}} />
            )}
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <View style={[styles.input, {backgroundColor: colors.white}]}>
                    <AppText
                        text={
                            placeholder.display && !constumDate
                                ? placeholder.value
                                : constumDate
                        }
                        style={{
                            color: colors.text,
                            fontSize: 18,
                        }}
                    />
                    <Feather name="calendar" size={24} color={colors.text} />
                </View>
            </TouchableOpacity>
            <AppText
                text={errorMessage || ' '}
                style={{}}
            />
            <DatePicke
                modal
                mode="date"
                open={isOpen}
                date={
                    checkMajority
                        ? new Date(`${majorityYear}-01-01`)
                        : value || new Date()
                }
                onConfirm={onValidate}
                onCancel={() => setIsOpen(false)}
                minimumDate={minimumDate}
                maximumDate={
                    checkMajority ? new Date(`${majorityYear}-01-01`) : maximumDate
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        paddingBottom: 10,
        fontSize: 18,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 10,
        borderRadius: 6,
        borderWidth: 1,
    },
});
export default AppDatePicker;
