import config from "../envImport/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async CreateAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //directly login with the credentials and push him to the website
                return this.Login({email, password})
            }else {
                return userAccount;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async Login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error:: ", error);
        }
        return null;
    }
    
    async Logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error: ", error)
        }
    }

}

const authService = new AuthService();

export default authService;



