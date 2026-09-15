/** Public contact details — update these when real business info is ready. */
export const siteContact = {
  email: "hello@primeweaves.com",
  phoneDisplay: "+91 00000 00000",
  /** Digits only, country code included (no + or spaces) for wa.me links */
  whatsappNumber: "910000000000",
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
