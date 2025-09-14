import {Platform, Text, TouchableOpacity, View} from "react-native";
import {addTicketDocument, UseGetOpenServices} from "../../services";
import {useEffect, useState} from "react";
import {PERMISSIONS, request, RESULTS} from "react-native-permissions";
import BluetoothClassic from "react-native-bluetooth-classic";
import {getTodayDate} from "../../utils";
import { TextEncoder } from "@kayahr/text-encoding";
import {POS} from "../../constants";

const DEVICE_NAME = "IposPrinter"; //

const ticketData = toPrinterBytes(
    POS.ALIGN_CENTER,
    POS.DOUBLE_HEIGHT_DOUBLE_WIDTH,
    "B.D.G\n",
    POS.NORMAL_FONT,
    "JETON D'ARRIVEE\n\n",
    "------------------------------\n",
    POS.DOUBLE_HEIGHT_DOUBLE_WIDTH,
    "0012",
    POS.NORMAL_FONT,
    POS.ALIGN_LEFT,
    "------------------------------\n",
    "Date: 14-09-2025\n",
    "CODE: 018393\n",
    "NOM: MAMAN JEANNE\n",
    "DATE: 02/02/2025 12:34:23\n",
    "------------------------------\n\n",
    POS.ALIGN_CENTER,
    "Ceci n'est pas\n",
    "un recu de paiement! Merci\n",
    "\n\n\n\n\n\n",
    "\n\n\n\n",
    POS.PAPER_CUT,
);

function toPrinterBytes(...args: (string | number[])[]): Uint8Array {
    const buffer: number[] = [];
    const encoder = new TextEncoder();

    for (const arg of args) {
        if (typeof arg === 'string') {
            buffer.push(...encoder.encode(arg));
        } else if (Array.isArray(arg)) {
            buffer.push(...arg);
        }
    }
    return new Uint8Array(buffer);
}

const Home = () => {
    const [device, setDevice] = useState<any>(null);
    const [tNum, setTNumber] = useState<number>(1);

    const {
        isPending: isGettingServices,
        data: services,
        refetch: reGetServices,
    } = UseGetOpenServices()

    console.log("run", services)

    useEffect(() => {
        // Request Bluetooth permissions on component mount
        requestBluetoothPermissions();
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

    const requestBluetoothPermissions = async () => {
        try {
            const permission = Platform.select({
                android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                ios: PERMISSIONS.IOS.BLUETOOTH,
            });

            if (permission) {
                const result = await request(permission);
                if (result === RESULTS.GRANTED) {
                    console.log('Bluetooth permissions granted');
                } else {
                    console.log('Bluetooth permissions are required to connect to the printer.');
                }
            } else {
                console.log('This platform is not supported for Bluetooth permissions.');
            }
        } catch (err: any) {
            console.log('Error requesting permissions.', err);
        }
    };


    const connectToPrinter = async () => {
        try {
            console.log("Connecting...");

            const pairedDevices = await BluetoothClassic.getBondedDevices();
            const printerDevice = pairedDevices.find(d => d.name === DEVICE_NAME);

            if (!printerDevice) {
                console.log("Printer not found. Ensure it is paired and Bluetooth is on.");
                return;
            }

            const connectedDevice = await printerDevice.connect();
            setDevice(printerDevice);
            console.log("Successfully connected to the printer.", printerDevice);
        } catch (error: any) {
            console.error("Connection failed:", error);
        }
    };
    const disconnectPrinter = async () => {
        if (device) {
            try {
                await device.disconnect();
                setDevice(null);
                console.log("Disconnected from the printer.");
            } catch (error: any) {
                console.error("Disconnection failed:", error);
            }
        }
    };


    const printTicket = async () => {
        // New and improved connection check
        await connectToPrinter()
        //await createTicket()
        if (!device || !device.write || !(await device.isConnected())) {
            console.warn("Device is not connected or ready. Printing failed.");
            return;
        }

        try {
            console.log("Printing...");
            const date = new Date().toLocaleString();

            if (device && device.write) {
                await device.write(ticketData);
                console.log("Printing successful!");
            } else {
                console.log("Device not connected. Printing failed.");
            }
        } catch (error: any) {
            console.error("Printing failed:", error);
        }
    };


    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

            <TouchableOpacity
                onPress={printTicket}
                style={{marginVertical: 10}}
            >
                <Text>Print Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={reGetServices}
                style={{marginVertical: 10}}
            >
                <Text>Fetch</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home