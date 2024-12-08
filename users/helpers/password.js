import bcr from "bcryptjs";

const hashPassword = async (password) => await bcr.hash(password, 10);

const comparePassword = async (password, anotherPassword) =>
    await bcr.compare(password, anotherPassword);

export { hashPassword, comparePassword };
