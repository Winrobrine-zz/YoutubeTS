import multer from "multer";
import { MulterAzureStorage } from "multer-blob-storage";

const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const azureStorage = {
    accessKey: ACCOUNT_ACCESS_KEY,
    accountName: STORAGE_ACCOUNT_NAME
};

export const videoUpload = multer({
    storage: new MulterAzureStorage(
        Object.assign(azureStorage, {
            containerName: "videos"
        })
    ),
    fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith("video"))
});
