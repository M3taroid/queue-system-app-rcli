import {Controller, FieldValues, useForm} from "react-hook-form";
import {Alert, View} from "react-native";
import {AppButton, AppInput, AppText} from "../../components";
import {
    hotGetTodayTicketsDocByService,
    UseAddOpenTicket,
    UseAddTicketDocument
} from "../../services";
import {getTodayDate} from "../../utils";
import moment from "moment";
import {TicketItemType} from "../../services/documents/TicketsDocuments.ts";
import {useEffect, useState} from "react";
import AppPrinter from "../../utils/AppPrinter.ts";
import {ItemType} from "../../types";

type Props = {
    ticketType: ItemType | null
    onFish?: () => void
}

const TicketForm = (props: Props) => {
    const {ticketType, onFish} = props;
    const [todayServicesTickets, setTodayServicesTickets] = useState<TicketItemType[]>([])
    const [ticketData, setTicketData] = useState<ItemType>()
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        hotGetTodayTicketsDocByService({service: `${ticketType?.id}`}, setTodayServicesTickets)
    }, [ticketType])

    const {isPending: isAddingTicket, mutate: AddOpenTicket, data: addResult} = UseAddOpenTicket()
    const {isPending: isAddingFbTicket, mutate: AddFbTicket, data: addFbResult} = UseAddTicketDocument()

    useEffect(() => {
        if(addFbResult){
            AddOpenTicket({
                ticket_number: `${todayServicesTickets?.length + 1}`,
                ticket_collection_id: `${addFbResult?.id}`,
                service_id: `${ticketType?.id}`,
                cashier_id: "0",
                ticket_call: "0",
                ticket_status: "await",
                customer_id: ticketData?.customer_code,
                customer_name: ticketData?.customer_name,
                created_by: "1000"
            })
        }
    }, [addFbResult]);

    useEffect(() => {
        if (addResult) {
            if (addResult?.responseData?.error === false) {
                const template = AppPrinter.getTicketTemplate({
                    date: ticketData?.datetime,
                    number: ticketData?.number,
                    customerCode: ticketData?.customer_code,
                    customerName: ticketData?.customer_name,
                    service: `${ticketType?.title}`,
                })
                Alert.alert("Message", "Imprimer le ticket", [
                        {
                            text: "OK",
                            onPress: async () => {
                                await AppPrinter.printOnDevice(template)
                                if (onFish) onFish()
                            },
                            style: "default"
                        }
                    ]
                )
            }
        }
    }, [addResult]);

    const onSubmit = async (data: FieldValues) => {
        const tDate = moment().format("DD-MM-YYYY HH:mm:ss");
        setTicketData({
            number: `${todayServicesTickets?.length + 1}`,
            datetime: tDate,
            customer_name: data.customer_name,
            customer_code: data.customer_code,
        })
        AddFbTicket({
            number: `${todayServicesTickets?.length + 1}`,
            cashier: "0",
            date: getTodayDate("fr"),
            datetime: tDate,
            status: "await",
            service: `${ticketType?.id}`,
            customer_name: data.customer_name,
            customer_code: data.customer_code,
            call: 0
        })
    }
    return (
        <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
            <AppText
                text={`Ticket -  ${ticketType?.title}`}
                style={{
                    fontSize: 24,
                    fontWeight: "bold"
                }}
            />
            <View style={{width: "100%",}}>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Entrez le Code du Client"
                        }
                    }}
                    name="customer_code"
                    render={({field: {onChange, onBlur, value}}) => (
                        <AppInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Code Client"
                            keyboardType="numeric"
                            errorMessage={errors["customer_code"] ? errors["customer_code"]?.message?.toString() : ""}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Entrez le Nom du Payeur"
                        }
                    }}
                    name="customer_name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <AppInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Nom du Payeur"
                            errorMessage={errors["customer_name"] ? errors["customer_name"]?.message?.toString() : ""}
                        />
                    )}
                />
            </View>

            <AppButton
                title="Valider"
                onPress={handleSubmit(onSubmit)}
                isLoading={isAddingTicket || isAddingFbTicket}
            />
        </View>
    )
}

export default TicketForm;