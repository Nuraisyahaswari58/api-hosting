import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  projectId: 'exercise-auxilium',
  keyFilename: path.join(__dirname, '../credentials/serviceAccountKey.json')
});

const bucket = storage.bucket('storage');

export default bucket;
