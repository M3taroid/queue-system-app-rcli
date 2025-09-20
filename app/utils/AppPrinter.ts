import {TextEncoder} from "@kayahr/text-encoding";
import BluetoothClassic, {BluetoothDevice} from "react-native-bluetooth-classic";
import {Alert} from "react-native";

export const DEVICE_NAME = "IposPrinter";
// ESC/POS Commands (common examples)
const ESC = 27; // Escape character
const GS = 29;  // Group Separator
const LF = 10;  // Line Feed
const CR = 13; // Carriage return
export const POS = {
    // Text Formatting
    FONT_A: 0,
    FONT_B: 1,
    BOLD_ON: [ESC, 69, 1],
    BOLD_OFF: [ESC, 69, 0],
    DOUBLE_HEIGHT_DOUBLE_WIDTH: [ESC, 33, 56],
    NORMAL_FONT: [ESC, 33, 0],
    // Alignment
    ALIGN_LEFT: [ESC, 97, 0],
    ALIGN_CENTER: [ESC, 97, 1],
    ALIGN_RIGHT: [ESC, 97, 2],
    // Barcode Commands
    BARCODE_HEIGHT: [GS, 104, 100], // 100 dots height
    BARCODE_WIDTH: [GS, 119, 2],    // Width of 2 dots
    BARCODE_SYSTEM_CODE128: [GS, 107, 73, 10], // Code 128
    BARCODE_PRINT: [10], // Line Feed after barcode data
    // Paper Commands
    PAPER_CUT: [GS, 86, 0], // Full cut
}

export function toPrinterBytes(...args: (string | number[])[]): Uint8Array {
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

export const getMultiTicketsTemplate = (data: {
    numberOfTicket: string
    firstTicketNumber: string
    service: string
    date: string
}) => {
    let dataString = ""
    for (let i = 0; i < parseInt(data.numberOfTicket); i++) {
        dataString += `
        ${POS.ALIGN_CENTER},
        ${POS.DOUBLE_HEIGHT_DOUBLE_WIDTH},
        "B.D.G\\n",
        ${POS.NORMAL_FONT},
        "JETON D'ARRIVEE\\n\\n",
        "------------------------------\\n",
        ${POS.DOUBLE_HEIGHT_DOUBLE_WIDTH},
        ${parseInt(data.firstTicketNumber)+i},
        ${POS.NORMAL_FONT},
        ${data.service},
        "\\n",
        ${POS.ALIGN_LEFT},
        "------------------------------\\n",
        "DATE: " + ${data.date} + "\\n",
        "------------------------------\\n\\n",
        ${POS.ALIGN_CENTER},
        "Ceci n'est pas\\n",
        "un recu de paiement! Merci\\n",
        "\\n\\n\\n\\n\\n\\n",
        "\\n\\n\\n\\n",
        `
    }
    return toPrinterBytes(
        dataString,
        POS.PAPER_CUT,
    )
}

export const getTicketTemplate = (data: {
    number: string
    service: string
    date: string
    customerCode: string
    customerName: string
}) => {
    return toPrinterBytes(
        POS.ALIGN_CENTER,
        POS.DOUBLE_HEIGHT_DOUBLE_WIDTH,
        "B.D.G\n",
        POS.NORMAL_FONT,
        "JETON D'ARRIVEE\n\n",
        "------------------------------\n",
        POS.DOUBLE_HEIGHT_DOUBLE_WIDTH,
        data.number,
        POS.NORMAL_FONT,
        data.service,
        "\n",
        POS.ALIGN_LEFT,
        "------------------------------\n",
        POS.BOLD_ON,
        "CODE: " + data.customerCode + "\n",
        POS.BOLD_OFF,
        "NOM: " + data.customerName + "\n",
        "DATE: " + data.date + "\n",
        "------------------------------\n\n",
        POS.ALIGN_CENTER,
        "Ceci n'est pas\n",
        "un recu de paiement! Merci\n",
        "\n\n\n\n\n\n",
        "\n\n\n\n",
        POS.PAPER_CUT,
    )
}

const connectToPrinter = async () => {
    try {
        const pairedDevices = await BluetoothClassic.getBondedDevices();
        const printerDevice = pairedDevices.find(d => d.name === DEVICE_NAME);
        if (!printerDevice) {
            Alert.alert("Printer not found. Ensure it is paired and Bluetooth is on.");
            return null;
        }

        const connectedDevice = await printerDevice.connect();
        if (!connectedDevice) {
            Alert.alert("Printer not connected.");
            return null;
        }
        return printerDevice;
    } catch (error: any) {
        console.error("Connection failed:", error);
    }
};

const disconnectPrinter = async (device: BluetoothDevice) => {
    if (device) {
        try {
            await device.disconnect();
            Alert.alert("Disconnected from the printer.");
        } catch (error: any) {
            console.error("Disconnection failed:", error);
        }
    }
};

const printOnDevice = async (data: any) => {
    const device = await connectToPrinter()

    if (!device || !device.write || !(await device.isConnected())) {
        Alert.alert("Device is not connected or ready. Printing failed. Try again.");
        return;
    }

    try {
        if (device && device.write) {
            await device.write(data);
        } else {
            Alert.alert("Printing failed.");
        }
    } catch (error: any) {
        console.error("Printing failed:", error);
    }
};

export default {
    getTicketTemplate,
    connectToPrinter,
    disconnectPrinter,
    printOnDevice,
    getMultiTicketsTemplate
}