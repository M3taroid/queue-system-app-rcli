export {default as endpoints} from './endpoints'
export {default as Colors} from './Colors'

export const AppKeys = {
    auth: "khjgafksvcxlskecoep",
    authToken: "sljzhgdushgsduylgsadhfgadie",
    theme: "ajkrdouygczahjvcsdhc"
}

export const cacheTime = {
    long: 6000,
    medium: 3000,
    short: 1000,
    none: 0,
}

export const ticketTypesData = [
    {
        id: "await",
        title: "En attente"
    },
    {
        id: "received",
        title: "Recu"
    },
    {
        id: "current",
        title: "En cours"
    },
    {
        id: "deleted",
        title: "Supprimé"
    },
    {
        id: "rejected",
        title: "Rejeté"
    },
    {
        id: "cancelled",
        title: "Annulé"
    },
]

export const ticketTypesKeys = {
    await: {
        id: "await",
        title: "En attente"
    },
    received: {
        id: "received",
        title: "Recu"
    },
    current: {
        id: "current",
        title: "En cours"
    },
    deleted: {
        id: "deleted",
        title: "Supprimé"
    },
    rejected: {
        id: "rejected",
        title: "Rejeté"
    },
    cancelled: {
        id: "cancelled",
        title: "Annulé"
    },
}
