import { Storage } from '@google-cloud/storage';
import path from 'path';

// Mendapatkan path dari URL modul ini
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename);

// Path to your Google Cloud service account key file
const keyFilename = path.join(__dirname, ' credentials/exercise-auxilium-1717a45b0b46.json');

const storage = new Storage({
  projectId: 'exercise-auxilium',
  keyFilename: 'exercise-auxilium-1717a45b0b46.json'
});

const bucketName = 'storage-auxilium';
const bucket = storage.bucket(bucketName);

const uploadImageToGCS = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file uploaded.');
      return;
    }

    const gcsFileName = `${Date.now()}-${file.originalname}`;
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

export { uploadImageToGCS };
