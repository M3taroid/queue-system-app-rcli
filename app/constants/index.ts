export {default as endpoints} from './endpoints'

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