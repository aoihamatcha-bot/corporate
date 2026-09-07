// Integration boundary for a future server-only delivery adapter. No provider is configured.
export type ContactSubmission = {
  purpose: string;
  company?: string;
  name: string;
  email: string;
  message: string;
  privacyAccepted: true;
};
export type DeliveryResult =
  | { status: "delivered"; receiptId: string }
  | { status: "failed"; retryable: boolean };
export interface ContactDelivery {
  send(
    submission: ContactSubmission,
    idempotencyKey: string,
  ): Promise<DeliveryResult>;
}
