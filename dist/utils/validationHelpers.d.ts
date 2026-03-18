export interface ValidationResult {
    isValid: boolean;
    message?: string;
}
export declare function validatePhoneNumber(phone: any): ValidationResult;
export declare function validateEmail(email: any): ValidationResult;
export declare function validatePassword(password: any): ValidationResult;
export declare function validateFullName(fullName: any): ValidationResult;
/**
 * Sanitize string input by trimming and handling null/undefined
 */
export declare function sanitizeString(value: any): string | null;
/**
 * Validate URL format (for profile pictures, etc.)
 */
export declare function validateUrl(url: any, fieldName?: string): ValidationResult;
/**
 * Comprehensive signup data validation
 */
export declare function validateSignupData(signupData: any): ValidationResult;
