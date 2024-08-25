export interface Dify {
  id: string;
  name: string;
  color: string;
}

export type DifyWithOptionalId = Omit<Dify, "id"> & { id?: string };
