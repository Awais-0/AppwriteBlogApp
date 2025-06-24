import config from "../config/config";
import { Client, ID, Databases, Storage, Query} from "appwrite";

export class DbServices {
    client = new Client()
    databases;
    storage;

    constructor () {
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    createPost = async ({title, content, image, status, userid, slug}) => {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                })
        } catch (error) {
            console.log("Error occured: config :: createPost: ", error)
        }
    }

    updatePost = async (slug, {title, content, image, status, userid}) => {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        } catch (error) {
            console.log("Error occured: config :: updatePost: ", error)
        }
    }

    deletePost = async (slug) => {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Error occured: config :: deletePost: ", error)
            return false
        }
    }

    getPost = async (slug) => {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Error occured: config :: getPost: ", error)
            return null
        }
    }

    listPosts = async () => {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ])
        } catch (error) {
            console.log("Error occured: config :: listPosts: ", error)
            return null
        }
    }

    // file upload services
    uploadFile = async (file) => {
        try {
            return await this.storage.createFile(config.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Error occured: config :: uploadFile: ", error)
        }
    }

    deleteFile = async (fileId) => {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log("Error occured: config :: deleteFile: ", error)
            return false
        }
    }

    getFilePreview = (fileId) => {
        try {
            return this.storage.getFileView(config.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Error occured: config :: getFilePreview: ", error)
        }
    }
}

const dbservice = new DbServices()

export default dbservice