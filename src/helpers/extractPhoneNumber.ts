export default async function extractPhoneNumber(userId: string) {
  const match = userId.match(/^(\d+)@s\.whatsapp\.net$/);

  if (match) {
    return match[1];
  } else {
    throw new Error("Format WhatsApp ID tidak valid");
  }
}
