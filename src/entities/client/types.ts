export interface Client {
  id: string;
  clientId: string;
  name: string;
  avatar: string;
  progress: number;
  created_at: Date;
  archived: boolean;
}
