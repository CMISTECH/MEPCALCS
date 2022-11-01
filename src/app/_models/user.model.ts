export interface User {
    Authorization: string;
    activatePendingFlag: boolean;
    email: string;
    firstName: string;
    lastName: string;
    nonce: string;
    timestamp: string;
}