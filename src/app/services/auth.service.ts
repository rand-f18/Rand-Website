import { Injectable } from "@angular/core";
import { IUser } from "../models/user.models";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    public currentUser: IUser = {
        name: '',
        phone: '',
        userName: '',
        password: '',
        emailId: ''
    }

    constructor(){}
}