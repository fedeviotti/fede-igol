export type Vehicle = {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  deletedAt?: string;
  user: User;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
} | null;

export type Garage = {
  id: number;
  name: string;
  createdAt: string;
  deletedAt?: string;
};
