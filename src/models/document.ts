import { IFile } from './file';

export interface IDocument {
  type: string;
  files: IFile[];
  description?: string;
}

export class DocumentModel implements IDocument {
  files: IFile[] = [];
  type: string;
  description?: string;
  constructor({ type, files, description }: IDocument) {
    this.type = type;
    this.files = files;
    this.description = description;
  }

  toFormData(): { [k: string]: any } {
    if (!this.files) {
      throw new Error('No files provided for document.');
    }

    const fd = {};
    this.files.forEach(
      ({ media_type, data, description, orientation }: IFile, index) => {
        fd[`files[${index}][media_type]`] = media_type;
        fd[`files[${index}][data]`] = data;
        fd[`files[${index}][description]`] = description || '';
        fd[`files[${index}][orientation]`] = orientation || '';
      }
    );

    const result = { ...this, ...fd };
    delete result.files;
    return result;
  }
}
