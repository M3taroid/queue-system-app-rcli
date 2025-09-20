import {Controller, FieldValues, useForm} from "react-hook-form";
import {Alert, View} from "react-native";
import {AppButton, AppDatePicker, AppInput, AppText} from "../../components";
import {
    hotGetLastTicketsDocByServiceAndDate,
    hotGetTodayTicketsDocByService,
    UseAddOpenTicket,
    UseAddTicketDocument
} from "../../services";
import moment from "moment";
import {TicketItemType} from "../../services/documents/TicketsDocuments.ts";
import {useEffect, useState} from "react";
import AppPrinter, {getMultiTicketsTemplate} from "../../utils/AppPrinter.ts";
import {ItemType} from "../../types";
import Colors from "../../constants/Colors.ts";
import {ticketTypesKeys} from "../../constants";

type Props = {
    ticketType: ItemType | null
    onFish?: () => void
}

const TicketMultiForm = (props: Props) => {
    const {ticketType, onFish} = props;
    const colors = Colors["light"]
    const [todayServicesTickets, setTodayServicesTickets] = useState<TicketItemType[]>([])
    const [lastTicket, setLastTicket] = useState<TicketItemType | null>(null)
    const [firstTicketNumber, setFirstTicketNumber] = useState<string>("")
    const [ticketData, setTicketData] = useState<ItemType>()
    const [ticketDate, setTicketDate] = useState<Date>(
        moment(new Date(), 'YYYY-MM-DD')?.toDate(),
    );
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

    useEffect(() => {
        if (ticketType && ticketDate ) {
            hotGetLastTicketsDocByServiceAndDate({
                service: `${ticketType?.id}`,
                date: moment(ticketDate).format('DD-MM-YYYY'),
            }, setLastTicket, {orderByNumber: true})
        }
    }, [ticketType, ticketDate])

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
                const template = AppPrinter.getMultiTicketsTemplate({
                    date: ticketData?.datetime,
                    firstTicketNumber: firstTicketNumber,
                    service: `${ticketType?.title}`,
                }, parseInt(ticketData?.numberOfTicket))
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
        const tDateTime = moment().format("DD-MM-YYYY HH:mm:ss");
        const tDate = moment(ticketDate).format('DD-MM-YYYY')
        const tNumber = `${parseInt(lastTicket?.number || "0")+ 1}`
        const numberOfTicket = parseInt(data.numberOfTicket) || 1
        setTicketData({
            number: `${tNumber}`,
            numberOfTicket: parseInt(data.numberOfTicket) || 1,
            datetime: tDateTime,
            customer_name: "-",
            customer_code: "-",
        })
        setFirstTicketNumber(`${tNumber}`)
        for (let i = 0; i < numberOfTicket; i++) {
            const num = parseInt(tNumber) + i
            AddFbTicket({
                number: `${num}`,
                cashier: "0",
                date: tDate,
                datetime: tDateTime,
                status: ticketTypesKeys.await.id,
                service: `${ticketType?.id}`,
                customer_name: "-",
                customer_code: "-",
                call: 0
            })
        }

    }
    return (
        <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
            <AppText
                text={`Ticket-${ticketType?.title} ${lastTicket ? `(${parseInt(lastTicket?.number || "0") + 1})` : "-"}`}
                style={{
                    fontSize: 24,
                    fontWeight: "bold"
                }}
            />
            <View style={{width: "100%",}}>
                <AppDatePicker
                    label="Date"
                    value={ticketDate || ''}
                    onConfirm={date => setTicketDate(date)}
                    placeholder={{
                        value: 'Date',
                        display: true,
                        color: {true: colors.text, false: colors.text},
                    }}
                    containerStyle={{marginBottom: 10}}
                />

                <Controller
                    control={control}
                    name="numberOfTicket"
                    rules={{
                        required: {
                            value: true,
                            message: 'Entrez le nombre de ticket',
                        },
                        min: {
                            value: 1,
                            message: 'Minimum 1',
                        },
                        max: {
                            value: 20,
                            message: 'Maximum 20',
                        }
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <AppInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label="Nombre de ticket"
                            keyboardType="numeric"
                            errorMessage={errors["numberOfTicket"] ? errors["numberOfTicket"]?.message?.toString() : ""}
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

export default TicketMultiForm;