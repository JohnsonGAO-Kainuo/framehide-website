// Central site config. Update the contact details here once they are final.
export const site = {
  name: "FrameHide",
  // TODO: replace with the real inbox before launch.
  email: "hello@framehide.com",
  // WhatsApp number (country code + digits, no "+", no spaces).
  whatsappDigits: "85293412653",
  // Shown to the reader.
  whatsappDisplay: "+852 9341 2653",
  // Optional socials. Leave empty to hide.
  instagram: "",
} as const;

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  if (!site.whatsappDigits) {
    // No number yet: fall back to the generic WhatsApp page so the button is never broken.
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${site.whatsappDigits}?text=${text}`;
}

export function mailtoLink(subject: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${site.email}?${params.toString()}`;
}
