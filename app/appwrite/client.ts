import { Account, Client, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    endpointurl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECTKEY,
    apiKey: import.meta.env.VITE_APPWRITE_APIKEY,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASEKEY,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_TABLEID,
    tripsCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_TABLEID,

}
const client = new Client().setEndpoint(appwriteConfig.endpointurl).setProject(appwriteConfig.projectId);
const avatars = new Avatars(client)
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
async function checkUserStatusAndPerformAction() {
    try {
        const user = await account.get();
        console.log('User is authenticated:', user);
        // Attempt the action that caused the error here
        // e.g., await account.updateName('New Name');
    } catch (error) {
        console.error('User is not authenticated or an error occurred:', error);
        if (error.code === 401 || error.type === 'user_unauthorized') { // Check for specific Appwrite error for unauthenticated
            console.log('User is currently a guest or not logged in.');
        }
        // Then attempt the action that caused the original error, expecting it to fail for guests
    }
}

// Call this function where the error is triggered
checkUserStatusAndPerformAction()
export { client, account, database, storage, avatars };