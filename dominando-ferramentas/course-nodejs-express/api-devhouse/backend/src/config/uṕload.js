import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '../../thumbnails'),
        filename: (request, file, callback) => {
            const extension = path.extname(file.originalname);
            const name = path.basename(file.originalname, extension);

            callback(null, `${name}-${Date.now()}${extension}`);
        },
    })
};