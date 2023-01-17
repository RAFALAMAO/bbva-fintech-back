import {
	AZURE_STORAGE_CONNECTION_STRING,
	AZURE_STORAGE_CONTAINER_NAME
} from "../config/index";
const { BlobServiceClient } = require("@azure/storage-blob");

import { UserQuery, UserDoctosQuery } from "../database/queries";


class azureStorageBlobService {

	static async uploadDocuments(body) {
		let response = {
			status: 200,
			message: 'Upload file success',
      		docLink: '',
		};
		const { email, docto } = body;
		const userQuery =  new UserQuery();
		const userDoctosQuery = new UserDoctosQuery();

		try {
			const dbUser = await userQuery.findOne({
				where: {
					correo_electronico: email,
					role_id: 2
				}
			});

			if( !dbUser ) {
				response.message = 'User not found';
				response.status = 404;
				return response;
			}

			if (!AZURE_STORAGE_CONNECTION_STRING) {
				throw Error('Azure Storage Connection string not found');
			}

			// Create the BlobServiceClient object with connection string
			const blobServiceClient = BlobServiceClient.fromConnectionString(
				AZURE_STORAGE_CONNECTION_STRING
			);

			// Get a reference to a container
			const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

			// Create a unique name for the blob
			const blobName = `${dbUser.id}-${String(email).replace(/@/g, '-at-').replace(/\./g, '-dot-')}_${docto.name}`;

			// Get a block blob client
			const blockBlobClient = containerClient.getBlockBlobClient(blobName);

			// Upload data to the blob
			const imgBuffer = Buffer.from(docto.base64, 'base64');
			const uploadBlobResponse = await blockBlobClient.uploadData(imgBuffer);

			console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);

			// Save url doc to db
			await userDoctosQuery.createOrUpdate(dbUser.id, blockBlobClient.url);

			response.docLink = blockBlobClient.url;
			return response;

		} catch (error) {
			console.log(error);
			return 'error';
		}
	}

	static async getDocuments() {
		let response = {
			status: 200,
			message: 'Get files success',
			documents: [],
		};
		const userQuery =  new UserQuery();

		try {
			const usersDocs = await userQuery.getUsersDocs();

			if( !usersDocs ) {
				response.message = 'Users not found';
				response.status = 404;
				return response;
			}

			response.documents = usersDocs;
			return response;

		} catch (error) {
			response.message = error.message;
			response.status = 404;
			return response;
		}
	}
}
module.exports = azureStorageBlobService;