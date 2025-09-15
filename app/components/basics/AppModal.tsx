
import React from 'react';
import {DimensionValue, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather} from "@react-native-vector-icons/feather";

type Props = {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    modalHeight?: DimensionValue
};

const AppModal = ({visible, onClose, children, modalHeight = "90%"}: Props) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <TouchableOpacity
                    onPress={onClose}
                    style={{
                        height: 40,
                        width: 40,
                        backgroundColor: "#FFFFFF",
                        borderRadius:40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        top: 1,
                        right: 1
                    }}>
                    <Feather name="x" size={24} />
                </TouchableOpacity>

                <View style={[styles.modalView, { height: modalHeight,}]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        paddingTop: 10,
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: "100%",
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 35,
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AppModal;
