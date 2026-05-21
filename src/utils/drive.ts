export const createFolder = async (accessToken: string, folderName: string) => {
  const metadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    throw new Error('Failed to create Drive folder');
  }
  const data = await response.json();
  return data.id; // Return the folder ID
};

// Multipart upload for Drive API
export const uploadFileToDrive = async (
  accessToken: string,
  file: File,
  folderId: string
) => {
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  const boundary = 'foo_bar_baz_boundary_12345';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  // Read file as ArrayBuffer
  const buffer = await file.arrayBuffer();

  let body = delimiter;
  body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
  body += JSON.stringify(metadata);
  body += delimiter;
  body += `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`;

  const blob = new Blob([
    body,
    buffer,
    closeDelimiter,
  ]);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: blob,
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Drive upload error:', err);
    throw new Error('Failed to upload file to Drive');
  }

  return response.json();
};

export const uploadTextAsDocument = async (
  accessToken: string,
  fileName: string,
  content: string,
  folderId: string
) => {
  const metadata = {
    name: fileName,
    parents: [folderId],
    mimeType: 'application/vnd.google-apps.document',
  };

  const boundary = 'foo_bar_baz_boundary_12345';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  let body = delimiter;
  body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
  body += JSON.stringify(metadata);
  body += delimiter;
  body += `Content-Type: text/plain\r\n\r\n`;
  body += content;
  body += closeDelimiter;

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: body,
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Drive document upload error:', err);
    throw new Error('Failed to save document to Drive');
  }

  return response.json();
};
