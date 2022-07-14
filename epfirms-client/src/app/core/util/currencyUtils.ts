import { createMask } from "@ngneat/input-mask";

export const currencyInputMask = createMask({
  prefix: '$',
  alias: 'numeric',
  groupSeparator: ',',
  digits: 2,
  digitsOptional: false,
  placeholder: '0',
});


  // method that formats the string; removes '$' and ',' and returns float
  export function toFloat(value : string): number {
    let formatted = value.replace(/\$/g, '');
    formatted = formatted.replace(/,/g, '');

    return parseFloat(formatted);
  }
