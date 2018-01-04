export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required && isValid) {
        isValid = value.trim() !== '';
    }
    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength
    }
    if (rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength
    }
    if (rules.isEmail && isValid) {
        // eslint-disable-next-line
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value)
    }
    if (rules.isNumber && isValid) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value)
    }
    return isValid;
};