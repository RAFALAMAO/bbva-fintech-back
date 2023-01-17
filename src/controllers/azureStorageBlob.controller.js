'use strict';
import { AzureStorageBlobService } from '../services';

class azureStorageBlobController {
	static async uploadDocuments(req, res,) {
        try {
			const { status, message, docLink } = await AzureStorageBlobService.uploadDocuments(req.body);

            res.status(status).send({ message: message, documentsUrl: docLink });
		} catch (e) {
			console.log(`ERROR:uploadDocuments - ${e}`);
			next(e);
		}
	}

    static async getDocuments(req, res, next) {
		try {
			const { status, message, documents } = await AzureStorageBlobService.getDocuments(req.body);

            res.status(status).send({ message: message, documents: documents });
		} catch (e) {
			console.log(`ERROR:uploadDocuments - ${e}`);
			next(e);
		}
	}
}

module.exports = azureStorageBlobController;