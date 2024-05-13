import {diskStorage} from "multer";
import multer from "multer";
import short from "short-uuid";
import path from "path";

const uploadFile = (dest: string) => {
    const storage = diskStorage({
        destination(req, file, cb){
            cb(null, dest);
        },
        filename(req, file, cb){
            cb(null, short.generate() + path.extname(file.originalname))
        }
    });

    return multer({ storage, limits: { fileSize: 4200000 } });
}

export default uploadFile;