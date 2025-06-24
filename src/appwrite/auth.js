import config from "../config/config";
import {ID, Client, Account} from "appwrite";

export class AuthServices {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    createAccount = async ({email, password, name}) => {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // login user after successfull signup
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    login = async ({email, password}) => {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    getCurrentUser = async () => {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Error occured :: getCurrentUser :', error)
        }
        return null
    }

    logout = async () => {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Error occured :: logout :', error)
        }
    }

}

const authservice = new AuthServices()

export default authservice