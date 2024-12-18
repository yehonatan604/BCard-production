const urlRegex = /https?:\/\/[^\s]+/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
const israeliPhoneRegex = /0\d([\d]{0,1})([-]{0,1})\d{7}/;
const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

export { urlRegex, emailRegex, passwordRegex, israeliPhoneRegex, mongoIdRegex };
