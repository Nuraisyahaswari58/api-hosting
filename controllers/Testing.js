import Testing from '../models/TestingModel.js';
import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import multer from 'multer';

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('storage-auxilium');

const multerStorage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: multerStorage }).single('file');

const uploadImageToGCS = (file) => {
	return new Promise((resolve, reject) => {
		if (!file || !file.originalname) {
			reject(new Error('A file name must be specified.'));
			return;
		}

		const blob = bucket.file(file.originalname);
		const blobStream = blob.createWriteStream({
			resumable: false
		});

		blobStream.on('error', (err) => {
			reject(err);
		});

		blobStream.on('finish', async () => {
			const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

			try {
				await bucket.file(file.originalname).makePublic();
				resolve(publicUrl);
			} catch (err) {
				reject(err);
			}
		});

		blobStream.end(file.buffer);
	});
};

export const upload = (req, res) => {
	uploadMiddleware(req, res, async (err) => {
		if (err) {
			return res.status(500).send('Error uploading file.');
		}

		try {
			const { nama } = req.body;
			if (!req.file) {
				return res.status(400).send('No file uploaded.');
			}

			const file = req.file;
			const imageUrl = await uploadImageToGCS(file);

			const image = await Testing.create({
				nama,
				image: imageUrl
			});

			res.json(image);
		} catch (error) {
			console.error(error);
			res.status(500).send('An error occurred while uploading the file.');
		}
	});
};
