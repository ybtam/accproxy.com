import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10 // The number of rounds to use for generating the salt

/**
 * Hashes a password with a unique salt.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)

  return await bcrypt.hash(password, salt)
}

/**
 * Validates a plain text password against a hashed password.
 * @param password - The plain text password to validate.
 * @param hashedPassword - The hashed password to validate against.
 * @returns Whether the password is valid.
 */
export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
