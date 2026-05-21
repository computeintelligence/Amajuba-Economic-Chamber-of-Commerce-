export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error("Failed to read file as base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const sendGmailWithAttachments = async (
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  files: File[]
) => {
  const boundary = 'foo_bar_baz_boundary_12345';
  
  let message = `To: ${to}\r\n`;
  message += `Subject: ${subject}\r\n`;
  message += `MIME-Version: 1.0\r\n`;
  message += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;
  
  // Body part
  message += `--${boundary}\r\n`;
  message += `Content-Type: text/plain; charset="UTF-8"\r\n`;
  message += `Content-Transfer-Encoding: 7bit\r\n\r\n`;
  message += `${body}\r\n\r\n`;
  
  // Attachments
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const base64Data = await readFileAsBase64(file);
    message += `--${boundary}\r\n`;
    message += `Content-Type: ${file.type || 'application/octet-stream'}; name="${file.name}"\r\n`;
    message += `Content-Disposition: attachment; filename="${file.name}"\r\n`;
    message += `Content-Transfer-Encoding: base64\r\n\r\n`;
    
    // Add base64 data in chunks of 76 chars (standard for email)
    const chunks = base64Data.match(/.{1,76}/g) || [];
    message += chunks.join('\r\n') + '\r\n\r\n';
  }
  
  message += `--${boundary}--`;
  
  // Base64Url encode the entire message
  const encodedMessage = btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    
  const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedMessage,
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    console.error("Gmail Error:", err);
    throw new Error(`Failed to send email: ${response.statusText}`);
  }
  
  return await response.json();
};
