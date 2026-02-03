const numberDigits = (value: string | number, seperator = " "): string => {
  const valueStr = String(value);
  let result = valueStr;
  if (valueStr?.length > 3) {
    result = valueStr?.replace(/[^0-9.]/g, "");
    if (valueStr.includes(".")) {
      result = valueStr?.substring(0, valueStr.indexOf(".") + 3);
    }
    result = valueStr?.replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
  }
  return result;
};

export { numberDigits };
