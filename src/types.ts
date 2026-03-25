export interface Template {
  id: number;
  name: string;
  description: string;
  type: string;
  tags: string[];
  lastModified: string;
  status: string;
  content?: string;
}
