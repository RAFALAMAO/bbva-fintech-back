import {
	AZURE_STORAGE_CONNECTION_STRING,
	AZURE_STORAGE_CONTAINER_NAME
} from "../config/index";
const { BlobServiceClient } = require("@azure/storage-blob");

import { UserQuery } from "../database/queries";


class azureStorageBlobService {

	static async uploadDocuments(body) {
		let response = {
			status: 200,
			message: 'Upload file success',
      		docLink: '',
		};
		const { email, docto } = body;
		const userQuery =  new UserQuery();

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

		try {
			if (!AZURE_STORAGE_CONNECTION_STRING) {
				throw Error('Azure Storage Connection string not found');
			}

			// Create the BlobServiceClient object with connection string
			const blobServiceClient = BlobServiceClient.fromConnectionString(
				AZURE_STORAGE_CONNECTION_STRING
			);

			// Get a reference to a container
			const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

			let newUrls = [];

			// List the blob(s) in the container.
			for await (const blob of containerClient.listBlobsFlat()) {
				// Get Blob Client from name, to get the URL
				const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

				// Display blob name and URL
				newUrls.push({name: blob.name, URL: tempBlockBlobClient.url})
				console.log(`name: ${blob.name} URL: ${tempBlockBlobClient.url}`);
			}

			return response;

		} catch (error) {
			console.log(error);
			return 'error';
		}
	}
}
module.exports = azureStorageBlobService;