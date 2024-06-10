import { promisify } from 'util';
import Multer from 'multer';

const maxSize = 2 * 1024 * 1024; // 2MB

// Configure Multer to use memory storage and set the file size limit
const processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single('file');

// Promisify the middleware function
const processFileMiddleware = promisify(processFile);

// Export the middleware
export default processFileMiddleware;
