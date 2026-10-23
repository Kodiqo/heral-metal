export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export function attachmentError(file: { name: string; size: number }): boolean {
  return file.size === 0 || file.size > MAX_ATTACHMENT_BYTES || !/\.(pdf|jpe?g|png|dwg)$/i.test(file.name);
}

// FormSubmit can return JSON booleans or the strings "true" / "false".
export function submissionSucceeded(result: unknown): boolean {
  return typeof result === 'object' && result !== null && 'success' in result &&
    (result.success === true || result.success === 'true');
}
