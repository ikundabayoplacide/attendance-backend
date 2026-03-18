import { Optional } from "sequelize";
import { IRoleAttributes } from "./role-type";
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending' | 'deleted' | 'archived' | 'rejected' | 'blacklisted';
export interface IUserAttributes {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string | number;
    status: UserStatus;
    roles?: IRoleAttributes[];
    profilePicture?: string;
    dateOfBirth?: Date;
    nationalId?: string;
    fingerPrint?: string;
    face?: string;
    voice?: string;
    signature?: string;
    passport?: string;
    motion?: string;
    igipande?: string;
    ocr?: string;
    gesture?: string;
    pupil?: string;
    otherBiometric?: string;
    nationality?: string;
    country?: string;
    province?: string;
    district?: string;
    sector?: string;
    cell?: string;
    village?: string;
    personalInChargeNationalId?: string;
    personalInChargeName?: string;
    personalInChargePhone?: string | number;
    personalInChargeEmail?: string;
    personalInChargeRelation?: string;
    personalInChargeOtherDetails?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'status' | 'roles' | 'createdAt' | 'updatedAt'> {
}
