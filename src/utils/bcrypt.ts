import bcrypt from 'bcryptjs';

export const comparePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};
