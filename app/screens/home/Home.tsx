import {Text, TouchableOpacity, View} from "react-native";
import {addTicketDocument, UseGetOpenServices} from "../../services";
import {useEffect, useState} from "react";
import {AppPermissions, getTodayDate} from "../../utils";





const Home = () => {
    const [device, setDevice] = useState<any>(null);
    const [tNum, setTNumber] = useState<number>(1);

    const {
        isPending: isGettingServices,
        data: services,
        refetch: reGetServices,
    } = UseGetOpenServices()

    useEffect(() => {
        const subscribe = async () =>  await AppPermissions.requestBluetoothPermissions();
        subscribe()
    }, []);

    const createTicket = async () => {
        const tDate = new Date().toLocaleString()
        await addTicketDocument({
            number: tNum?.toString(),
            cashier: "0",
            date: getTodayDate("fr"),
            datetime: tDate,
            status: "await",
            service: "2",
            customer_name: "Test",
            customer_code: "0001",
            call: 0
        })
        setTNumber(p => p + 1)
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

        </View>
    )
}

export default Home