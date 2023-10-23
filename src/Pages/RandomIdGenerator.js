export function generateRandomId() {
    const timestamp = Date.now();
    const randomNum = Math.random() * Math.pow(10, 16);
    const randomId = Math.floor(timestamp + randomNum).toString(16);
    return randomId;
}