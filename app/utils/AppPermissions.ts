import {Alert, Platform} from "react-native";
import {PERMISSIONS, request, RESULTS} from "react-native-permissions";

const requestBluetoothPermissions = async () => {
    try {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            ios: PERMISSIONS.IOS.BLUETOOTH,
        });

        if (permission) {
            const result = await request(permission);
            if (result === RESULTS.GRANTED) {
                Alert.alert('Bluetooth permissions granted');
            } else {
                Alert.alert('Bluetooth permissions are required to connect to the printer.');
            }
        } else {
            Alert.alert('This platform is not supported for Bluetooth permissions.');
        }
    } catch (err: any) {
        Alert.alert('Error requesting permissions.', err);
    }
};


export default { requestBluetoothPermissions };
