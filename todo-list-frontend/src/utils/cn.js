/** Une clases condicionales sin dependencias externas. */
export const cn = (...classes) => classes.filter(Boolean).join(" ");
