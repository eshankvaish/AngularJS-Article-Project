export default function modifyLocalStorageItem(method, key, value = '') {
    switch (method) {
    case 'set':
        localStorage.setItem(key, JSON.stringify(value));
    case 'get':
        return JSON.parse(localStorage.getItem(key));
    case 'remove':
        localStorage.removeItem(key);
    default:
        return 'Incorrect Method!';
    }
};
