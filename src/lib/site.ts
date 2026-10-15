export const razorpayPaymentUrl = "https://razorpay.me/@primeweaves";

/** Inboxes that receive every website form submission. */
export const formInboxes = [
  "admin@primeweaves.com",
  "sales@primeweaves.com",
  "info@primeweaves.com",
] as const;

/** Public contact details. */
export const siteContact = {
  email: "info@primeweaves.com",
  phoneDisplay: "+91 82941 42439",
  /** Digits only, country code included (no + or spaces) for wa.me links */
  whatsappNumber: "918294142439",
  addressLines: [
    "Prime Weaves",
    "Manufacturing & dispatch",
    "India",
  ],
  hours: "10:00 AM – 7:00 PM",
} as const;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${siteContact.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
