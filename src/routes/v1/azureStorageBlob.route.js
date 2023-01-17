import express from 'express';

import AzureStorageBlobController from "../../controllers/AzureStorageBlob.controller";
const router = express.Router();

router.post('/upload-files', AzureStorageBlobController.uploadDocuments);
router.get('/get-files', AzureStorageBlobController.getDocuments);

module.exports = router;
