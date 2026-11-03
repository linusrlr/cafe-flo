import { toHtml } from 'hast-util-to-html';
import { ICON_TEL } from './inhalte.mjs';
export { firma, telefonNbsp } from './fakten.mjs';
export const ICON_TEL_HTML = toHtml(ICON_TEL);
