import { IFile } from './file';
export interface IDocument {
    type: string;
    files: IFile[];
    description?: string;
}
export declare class DocumentModel implements IDocument {
    files: IFile[];
    type: string;
    description?: string;
    constructor({ type, files, description }: IDocument);
    toFormData(): {
        [k: string]: any;
    };
}
