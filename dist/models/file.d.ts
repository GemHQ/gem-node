export interface IFile {
    media_type: string;
    data: any;
    description?: string;
    orientation?: string;
}
export declare class FileModel implements IFile {
    media_type: string;
    data: any;
    description?: string;
    orientation?: string;
    constructor({ media_type, data, description, orientation }: IFile);
}
