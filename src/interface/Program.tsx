export interface Program {
  id: string;
  name: string;
  description: string;
  programStatus: string;
  location: string;
  variant: 'default' | 'ghost';
}
