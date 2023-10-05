import { createHash } from 'crypto';

function hashPassword(password: string): string {
    const sha256 = createHash('sha256');
    sha256.update(password, 'utf8');
    return sha256.digest('hex');
}

export { hashPassword };