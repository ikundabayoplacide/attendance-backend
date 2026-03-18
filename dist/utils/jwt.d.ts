import { JWTPayload } from "jose";
export type TokenType = 'access' | 'refresh';
export interface TokenPayload extends JWTPayload {
    userId: string;
    type: TokenType;
    email: string;
    roles: string[];
    tokenId: string;
}
/**
 * Generate a JWT token
 * @param payload Token payload
 * @param expiresIn Expiration time in seconds (default: 1 day for access, 7 days for refresh)
 * @returns Signed JWT token
 */
export declare function generateToken(payload: Omit<TokenPayload, 'tokenId'>, expiresIn: number): Promise<string>;
/**
 * Verify a JWT token
 * @param token JWT token to verify
 * @param expectedType Expected token type (access or refresh)
 * @returns Decoded token payload if valid
 * @throws If token is invalid or expired
 */
export declare function verifyToken(token: string, expectedType?: TokenType): Promise<TokenPayload>;
