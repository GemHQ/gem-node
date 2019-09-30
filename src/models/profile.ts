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

export class ProfileModel implements IProfile {
  name: IProfileName;
  phone_number: string;
  address: IProfileAddress;
  email_address: string;
  social_security_number: string;
  date_of_birth: string;

  constructor({
    name,
    phone_number,
    address,
    email_address,
    social_security_number,
    date_of_birth,
  }: IProfile) {
    this.name = name;
    this.phone_number = phone_number;
    this.address = address;
    this.email_address = email_address;
    this.social_security_number = social_security_number;
    this.date_of_birth = date_of_birth;
  }
}
