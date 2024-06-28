export type Program = {
  id: string;
  name: string;
  description: string;
  programStatus: string;
  location: string;
  Company: any;
  SeverityReward: any;
  createdAt: string;
  updatedAt: string;
};

export type EditableProgram = Omit<
  Program,
  'id' | 'createdAt' | 'updatedAt' | 'Company' | 'SeverityReward'
>;
