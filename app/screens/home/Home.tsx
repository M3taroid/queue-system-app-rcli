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
import {TicketForm} from "../index.ts";
import {ItemType} from "../../types";

const itemBgs = [
    "#134e4a",
    "#312e81",
]

const Home = () => {
    const [device, setDevice] = useState<any>(null);
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
            <TouchableOpacity
                style={{
                    //height: 150,
                    width: "100%",
                    paddingVertical: 30,
                    backgroundColor: itemBgs[index],
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginBottom: 20,
                    borderRadius: 10
                }}
                onPress={() => ItemPress(item)}
            >
                <View style={{
                    backgroundColor: "#FFFFFF",
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 15
                }}>
                    <Feather name="bookmark" style={{fontSize: 50, color: itemBgs[index]}}/>
                </View>
                <AppText
                    text={item.title}
                    color="#FFF"
                    style={{fontSize: 21, fontWeight: "900", textTransform: "uppercase"}}
                />
            </TouchableOpacity>
        )
    }

    const renderView = () => {
        if (isGettingServices) return <ActivityIndicator size="large"/>
        if (services?.responseData?.data?.length) {
            return (
                <View style={{width: "100%"}}>
                    <AppText
                        text="Générer un Ticket"
                        style={{
                            fontSize: 21,
                            fontWeight: "900",
                            textTransform: "uppercase",
                            textAlign: "center",
                            paddingBottom: 20
                        }}
                    />
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
            <AppHeader
                showBackIcon={false}
                title="Queue System"
            />
            <View style={styles.container}>
                {renderView()}
            </View>

            <AppModal
                modalHeight="70%"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                children={
                    <TicketForm onFish={() => setModalVisible(false)} ticketType={selectedItem}/>
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
})

export default Home