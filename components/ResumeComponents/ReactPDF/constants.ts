export const PX_PER_PT = 4 / 3;

// Reference: https://www.prepressure.com/library/paper-size/letter
// Letter size is commonly used in US & Canada, while A4 is the standard for rest of world.
export const LETTER_WIDTH_PT = 612;
const LETTER_HEIGHT_PT = 792;
export const LETTER_WIDTH_PX = LETTER_WIDTH_PT * PX_PER_PT;
export const LETTER_HEIGHT_PX = LETTER_HEIGHT_PT * PX_PER_PT;
export const DEFAULT_THEME_COLOR = "#000000"; // sky-400
export const DEFAULT_FONT_FAMILY = "Merriweather";
export const DEFAULT_FONT_SIZE = "9"; // text-base https://tailwindcss.com/docs/font-size
export const DEFAULT_DOCUMENT_SIZE = "A4";
// Reference: https://www.prepressure.com/library/paper-size/din-a4
export const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;
export const A4_WIDTH_PX = A4_WIDTH_PT * PX_PER_PT;
export const A4_HEIGHT_PX = A4_HEIGHT_PT * PX_PER_PT;
export const DEFAULT_FONT_COLOR = "#000000";
export const DEBUG_RESUME_PDF_FLAG: true | undefined = undefined; // use undefined to disable to deal with a weird error message
