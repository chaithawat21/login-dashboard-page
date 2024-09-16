export interface User {
    id: number;
    username: string;
    password?: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    position: string;
    isActive: boolean;
  }