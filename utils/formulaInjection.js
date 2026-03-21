export const preventFormulaInjection = (value) => {
    if (/^[=+\-@]/.test(value)) {
        return `'${value}`;
    }
    return value;
};