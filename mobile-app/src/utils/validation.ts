/* ================================================================== */
/*  Validation                                                         */
/* ================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?2)?01[0-9]{9}$/; // Egyptian mobile

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return typeof password === "string" && password.length >= 6;
}

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone.trim());
}

export function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

export function isPositiveNumber(n: unknown): n is number {
  return typeof n === "number" && isFinite(n) && n > 0;
}

export function isInBounds(n: number, lo: number, hi: number): boolean {
  return n >= lo && n <= hi;
}

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!isNonEmpty(email)) return { ok: false, error: "auth.invalid_email" };
  if (!isValidEmail(email)) return { ok: false, error: "auth.invalid_email" };
  return { ok: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!isValidPassword(password))
    return { ok: false, error: "auth.invalid_password" };
  return { ok: true };
}

export function validatePasswordMatch(
  password: string,
  confirm: string
): ValidationResult {
  if (password !== confirm)
    return { ok: false, error: "auth.password_mismatch" };
  return { ok: true };
}

export function validatePriceInput(s: string): ValidationResult {
  const n = parseFloat(s);
  if (!isFinite(n) || n <= 0) return { ok: false, error: "prices.invalid" };
  if (n > 100_000) return { ok: false, error: "prices.invalid" };
  return { ok: true };
}

export function validateFeedback(subject: string, message: string): ValidationResult {
  if (!isNonEmpty(subject)) return { ok: false, error: "feedback.subject_required" };
  if (!isNonEmpty(message)) return { ok: false, error: "feedback.message_required" };
  return { ok: true };
}

/** Sanitize a string for safe display (no HTML entities needed in RN). */
export function sanitize(s: string): string {
  return s.replace(/[<>]/g, "").trim();
}
