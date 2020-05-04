import * as debug from 'debug';
export declare const dbg: debug.Debugger;
export declare const GEM_BASE_URL = "https://vgs-sandbox.gem.co";
export declare const GEM_CSRF_COOKIE_NAME = "gem_user_csrf";
export declare const GEM_CSRF_HEADER_NAME = "X-Gem-User-Csrf-Token";
export declare enum Endpoints {
    users = "/users",
    profiles = "/profiles",
    documents = "/documents",
    institutions = "/institutions",
    institution_users = "/institution_users",
    accounts = "/accounts",
    transactions = "/transactions",
    credentials = "/credentials",
    connections = "/connections",
    assets = "/gem_assets",
    prices = "/prices",
    auth = "/auth",
    otp = "/auth/otp",
    session_validity = "/authenticated",
    logout = "/logout",
    refresh = "/refresh"
}
export declare namespace GemResponseType {
    interface IAsset {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        ticker: string;
    }
    interface IPrice {
        timestamp: string;
        asset_id: string;
        currency_id: string;
        price: number;
        institution_id: string;
    }
    interface ICreatedCredential {
        credential_id: string;
        credential_expires_at: string;
    }
    interface ISessionValidity {
        authenticated: boolean;
        application_id: string;
        user_id?: string;
        read_access_expires_at?: number;
        execute_access_expires_at?: number;
        user?: IUser;
    }
    interface IConnection {
        id: string;
        created_at: string;
        updated_at: string;
        institution_id: string;
        user_id: string;
        institution_user_id: string;
        status: string;
        expires_at: string;
        additional_reason: any;
    }
    interface IDocument {
        id: string;
        description: string;
        type: string;
        category: string;
    }
    interface IUser {
        id: string;
        created_at: string;
        updated_at: string;
        verified: boolean;
        status: 'verified' | 'pending_email_verification' | 'pending_phone_number_verification';
        consented: boolean;
        email: string;
        phone_number?: string;
    }
    interface IProfile {
        id: string;
        created_at: string;
        updated_at: string;
        user_id: string;
        status: string;
        expires_at?: string;
        country: string;
        state: string;
        documents: IDocument[];
    }
    interface ICredentialFormat {
        format: string;
        fields: {
            [k: string]: any;
        }[];
    }
    interface IInstitution {
        id: string;
        name: string;
        credentials_formats: ICredentialFormat[];
    }
    interface IBaseMessage {
        message: string;
    }
    interface IVerifyOTP {
        user_id: string;
        application_id: string;
        read_access_expires_at: number;
        csrf: string;
        access?: string;
    }
    interface IInstitutionUser {
        id: string;
        status: string;
        profile_id: string;
        institution_id: string;
        connection_id: string;
        external_id: string;
        additional_reason: any;
        profile: IProfile;
        institution: IInstitution;
        connection: IConnection;
        created_at: string;
        updated_at: string;
    }
    interface IAccount {
        id: string;
        created_at: string;
        updated_at: string;
        asset_id: string;
        status: string;
        external_id: string;
        name: string;
        type: string;
        enabled: boolean;
        connection_id: string;
        institution_id: string;
    }
    interface ITransactionFee {
        type: string;
        amount: number;
        asset_id: string;
        summary: string;
        description: string;
    }
    interface ITransaction {
        id: string;
        created_at: string;
        updated_at: string;
        user_id: string;
        source: {
            id: string;
            created_at: string;
            updated_at: string;
            asset_id: string;
            status: string;
            external_id: string;
            name: string;
            type: string;
            enabled: boolean;
            connection_id: string;
            institution_id: string;
        };
        fees: ITransactionFee[];
        status: string;
        source_amount: number;
        destination_amount: number;
        source_asset_id: string;
        instructions: any;
        destination_asset_id: string;
        external_id: string;
        type: string;
        additional_data: any;
        reason: {
            message: string;
        };
    }
}
