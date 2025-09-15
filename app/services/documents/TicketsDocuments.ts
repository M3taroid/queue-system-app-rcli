import {dbCollection} from "../firebaseService";
import {addDoc, serverTimestamp, deleteDoc, updateDoc, doc, query, where, onSnapshot} from "firebase/firestore";
import {getTodayDate} from "../../utils";
import {useMutation} from "@tanstack/react-query";

type TicketStatusType = "await" | "current" | "received" | "rejected" | "cancelled"

export interface TicketItemType {
    id?: string;
    number: string;
    cashier: string;
    service: string;
    received_at?: string | Date;
    created_at?: any;
    customer_code?: string;
    customer_name?: string;
    date: string | Date;
    datetime: string | Date;
    status: TicketStatusType
    call: number
}

export type QueryOptionsType = {
    orderByDate?: boolean
}

const mapItem = (item: any) => (
    {
        id: item.id,
        number: item.data().number,
        cashier: item.data().cashier,
        date: item.data().date,
        datetime: item.data().datetime,
        status: item.data().status,
        service: item.data().service,
        call: item.data().call,
        customer_code: item.data().customer_code,
        customer_name: item.data().customer_name,
        received_at: item.data().received_at,
        created_at: item.data().created_at,
    }
)


export const ticketCollection = dbCollection("tickets");

export const addTicketDocument = async (item: TicketItemType) => {
    return await addDoc(ticketCollection, {...item, created_at: serverTimestamp()})
}

export const UseAddTicketDocument = () => {
    return useMutation({
        mutationFn: async (item: TicketItemType) => {
            return await addDoc(ticketCollection, {
                ...item,
                created_at: serverTimestamp()
            });
        },
    });
}

export const updateTicketDocument = async (id: string, item: { [key: string]: any }) => {
    if (!id) return
    return await updateDoc(doc(ticketCollection, id), item)
}

export const deleteTicketsDocument = async (id: string) => {
    return await deleteDoc(doc(ticketCollection, id))
}

export const hotGetTodayTicketsDocByService = (keys: {
    service: string,
}, setData: (items: TicketItemType[]) => void) => {
    const q = query(ticketCollection,
        where('service', '==', keys.service),
        where('date', '==', getTodayDate("fr"))
    );
    onSnapshot(q, (snapshot) => {
        const items: TicketItemType[] = snapshot.docs.map(mapItem)
        setData(items)
    })
}