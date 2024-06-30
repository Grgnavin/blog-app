import config from "../envImport/config.js";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.error("Error in createPost:: ",error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error("Error in updatePost:: ", error);
        }
    }

    async deleteDocumant(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error while deleting the post:: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error while getting post::", error);
            return false;
        }
    }

    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                query
            )
        } catch (error) {
            console.log("Error while gettingPosts:: ", error)
            return false;
        }
    }

    //file Upload service
    async fileUpload(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error while uploading file::", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Error while deleting file::", error);
        }
    }

    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Error while getting the file Preview::", error);

        }
    }

}

const service = new Service();

export default service;