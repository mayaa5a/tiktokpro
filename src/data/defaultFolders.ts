export type Folder = {
  id: string;
  name: string;
  createdAt: number;
};

export const defaultFolders: Folder[] = [
  { id: 'f1', name: 'NYC Trip', createdAt: 1739923200000 },
  { id: 'f2', name: 'Coffee Spots', createdAt: 1739923200000 },
  { id: 'f3', name: 'Shopping', createdAt: 1739923200000 },
  { id: 'f4', name: 'Thrift Austin', createdAt: 1739923200000 },
  { id: 'f5', name: 'Food Finds', createdAt: 1739923200000 },
];
