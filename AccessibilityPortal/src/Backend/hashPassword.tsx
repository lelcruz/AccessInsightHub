import {createHash} from 'crypto';

/**
 * Hashes a password using SHA-256.
 *
 * @param {string} password - The plaintext password.
 * @returns {string} - Hashed password in hexadecimal format.
 */
function hashPassword(password: string): string {
    // Create a SHA-256 hash and return its hexadecimal value
    const sha256 = createHash('sha256');
    sha256.update(password, 'utf8');
    return sha256.digest('hex');
}

export {hashPassword};
