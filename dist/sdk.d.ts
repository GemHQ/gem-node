import { FileModel, DocumentModel, ProfileModel } from './models';
export declare namespace SDK {
    namespace Models {
        class Document extends DocumentModel {
        }
        class File extends FileModel {
        }
        class Profile extends ProfileModel {
        }
    }
    class Gem {
        private client;
        constructor(config: any);
        createUser: () => Promise<any>;
        listUsers: () => Promise<any>;
        getUser: (userId: string) => Promise<any>;
        deleteUser: (userId: string) => Promise<any>;
        listProfiles: (userId: string) => Promise<any>;
        getProfile: (profileId: string) => Promise<any>;
        deleteProfile: (profileId: string) => Promise<any>;
        updateProfile: (profileId: string, profile: ProfileModel) => Promise<any>;
        createProfile: (userId: string, profile: ProfileModel) => Promise<any>;
        createTemporaryProfile: (userId: string, profile: ProfileModel) => Promise<any>;
        listProfileDocuments: (profileId: string) => Promise<any>;
        createProfileDocument: (profileId: string, document: DocumentModel) => Promise<any>;
        deleteDocument: (documentId: string) => Promise<any>;
        updateDocument: (documentId: string, document: DocumentModel) => Promise<any>;
        listInstitutions: () => Promise<any>;
        getInstitution: (institutionId: string) => Promise<any>;
        createInstitutionUser: (profileId: string, institutionId: string) => Promise<any>;
        updateInstitutionUser: (institutionUserId: string, profileId: string) => Promise<any>;
        getInstitutionUser: (institutionUserId: string) => Promise<any>;
    }
}
