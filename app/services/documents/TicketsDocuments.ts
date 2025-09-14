import {dbCollection} from "../firebaseService";
import {addDoc, serverTimestamp, deleteDoc, updateDoc, doc} from "firebase/firestore";

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


export const ticketCollection = dbCollection("tickets");

export const addTicketDocument = async (item: TicketItemType) => {
    return await addDoc(ticketCollection, {...item, created_at: serverTimestamp()})
}

export const updateTicketDocument = async (id: string, item: { [key: string]: any }) => {
    if (!id) return
    return await updateDoc(doc(ticketCollection, id), item)
}

export const deleteTicketsDocument = async (id: string) => {
    return await deleteDoc(doc(ticketCollection, id))
}