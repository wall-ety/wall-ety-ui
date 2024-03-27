export function required() {
  return (fieldName: string, value: any) =>
    !value ? `${fieldName} is required` : undefined;
}

export function number() {
  return (fieldName: string, value: any) =>
    isNaN(value) ? `${fieldName} must be a number` : undefined;
}

export function min(minValue: number) {
  return (fieldName: string, value: any) => {
    if (number()(fieldName, value)) {
      return number()(fieldName, value);
    }
    return minValue > +value ? `The minimum value is ${minValue}` : undefined;
  };
}

export function max(maxValue: number) {
  return (fieldName: string, value: any) => {
    if (number()(fieldName, value)) {
      return number()(fieldName, value);
    }
    return maxValue < +value ? `The max value is ${maxValue}` : undefined;
  };
}
