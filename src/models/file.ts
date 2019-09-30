export interface IFile {
  media_type: string;
  data: any;
  description?: string;
  orientation?: string;
}

export class FileModel implements IFile {
  media_type: string;
  data: any;
  description?: string;
  orientation?: string;
  constructor({ media_type, data, description, orientation }: IFile) {
    this.media_type = media_type;
    this.data = data;
    this.description = description;
    this.orientation = orientation;
  }
}
