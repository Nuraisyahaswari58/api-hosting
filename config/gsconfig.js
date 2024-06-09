import { Storage } from "@google-cloud/storage";
import path from "path";

// Mendapatkan path dari direktori tempat file ini berada
const __dirname = path.resolve();

// Path ke file kredensial JSON Anda
const keyFilename = path.join(
  __dirname,
  "credentials/exercise-auxilium-1717a45b0b46.json"
);

const storage = new Storage({
  projectId: "exercise-auxilium",
  keyFilename: keyFilename,
});

const bucketName = "storage-auxilium";
const bucket = storage.bucket(bucketName);

export default bucket;
