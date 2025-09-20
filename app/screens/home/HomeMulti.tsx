import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {UseGetOpenServices} from "../../services";
import {useEffect, useState} from "react";
import {AppPermissions} from "../../utils";
import {AppHeader, AppModal, AppText, ErrorState} from "../../components";
import {Feather} from "@react-native-vector-icons/feather";
import {TicketForm, TicketMultiForm} from "../index.ts";
import {ItemType} from "../../types";

const itemBgs = [
    "#134e4a",
    "#312e81",
]

const HomeMulti = () => {
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const {
        isPending: isGettingServices,
        data: services,
        refetch: reGetServices,
    } = UseGetOpenServices()

    useEffect(() => {
        const subscribe = async () => await AppPermissions.requestBluetoothPermissions();
        subscribe()
    }, []);

    const ItemPress = (item: ItemType) => {
        setSelectedItem(item)
        setTimeout(() => setModalVisible(true), 200)
    }

    const renderItem = (item: any, index: number) => {
        return (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}>
                <TouchableOpacity
                    style={[styles.itemContainer, {backgroundColor: itemBgs[index]}]}
                    onPress={() => ItemPress(item)}
                >
                    <View style={styles.itemIconContainer}>
                        <Feather name="plus" style={{fontSize: 15, color: itemBgs[index]}}/>
                    </View>
                    <AppText
                        text={` + ${item.title}`}
                        color="#FFF"
                        style={{fontSize: 14, fontWeight: "900", textTransform: "uppercase"}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderView = () => {
        if (isGettingServices) return <ActivityIndicator size="large"/>
        if (services?.responseData?.data?.length) {
            return (
                <View style={{width: "100%"}}>
                    <FlatList
                        data={services?.responseData?.data}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({item, index}) => renderItem(item, index)}
                        contentContainerStyle={{
                            paddingBottom: 100,
                            paddingHorizontal: 10,
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isGettingServices}
                                onRefresh={reGetServices}
                            />
                        }
                    />
                </View>
            )
        } else return <ErrorState message="Error" onReload={reGetServices}/>
    }


    return (
        <View style={{flex: 1}}>
            {/*<AppHeader*/}
            {/*    showBackIcon={false}*/}
            {/*    title="Queue System"*/}
            {/*/>*/}
            <View style={styles.container}>
                {renderView()}
            </View>

            <AppModal
                modalHeight="80%"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                children={
                    <>
                         <TicketMultiForm onFish={() => setModalVisible(false)} ticketType={selectedItem}/>
                    </>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        width: "95%",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 10
    },
    itemIconContainer: {
        backgroundColor: "#FFFFFF",
        width: 40,
        height: 40,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    }
})

export default HomeMulti