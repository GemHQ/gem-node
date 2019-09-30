export interface IProfileName {
    given_names: string;
    family_names: string;
}
export interface IProfileAddress {
    street_1: string;
    street_2: string;
    city: string;
    postal_code: string;
    country: string;
    state: string;
}
export interface IProfile {
    name: IProfileName;
    phone_number: string;
    address: IProfileAddress;
    email_address: string;
    social_security_number: string;
    date_of_birth: string;
}
export declare class ProfileModel implements IProfile {
    name: IProfileName;
    phone_number: string;
    address: IProfileAddress;
    email_address: string;
    social_security_number: string;
    date_of_birth: string;
    constructor({ name, phone_number, address, email_address, social_security_number, date_of_birth, }: IProfile);
}
