export function normalizeTechnicianContact(value: string): string {
  return value.trim();
}

export function isEmailContact(contact: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
}

export function buildApprovalMessage(
  projectName: string,
  clientName: string,
  shareUrl: string
): string {
  return `Proposal Approved for Project ${projectName} by ${clientName}. Link: ${shareUrl}`;
}

/** Opens mailto for email contacts, wa.me for phone numbers. */
export function buildApprovalNotificationUrl(
  contact: string,
  projectName: string,
  clientName: string,
  shareUrl: string
): string | null {
  const trimmed = normalizeTechnicianContact(contact);
  if (!trimmed) return null;

  const message = buildApprovalMessage(projectName, clientName, shareUrl);

  if (isEmailContact(trimmed)) {
    const subject = encodeURIComponent(`Proposal Approved: ${projectName}`);
    const body = encodeURIComponent(message);
    return `mailto:${trimmed}?subject=${subject}&body=${body}`;
  }

  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 7) return null;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
