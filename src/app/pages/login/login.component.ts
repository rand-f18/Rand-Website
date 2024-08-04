import { Component, Injectable, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // for ngIf
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IUser } from '../../models/user.models';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {
  
    public isLoginView: boolean = true;
    // ------------------------------------------------------------------------------------------------------------------------------------
    constructor(
        public authSVC: AuthService,
        private router: Router,
    ) { }
    // ------------------------------------------------------------------------------------------------------------------------------------
    ngOnInit() {
        // Check if the admin user is already in local storage
        const isLocalData = localStorage.getItem("angular18Local");
        if (isLocalData == null) {
            // Add the admin user to the local storage
            const adminUser = {
                name: 'Admin',
                phone: '1234567890',
                userName: 'admin',
                password: '123',
                emailId: 'admin@example.com'
            };
            const localArray = [];
            localArray.push(adminUser);
            localStorage.setItem("angular18Local", JSON.stringify(localArray))
        }
    }
    // ------------------------------------------------------------------------------------------------------------------------------------
    public onRegister(): void {
        if (this.authSVC.currentUser.userName === 'admin' && this.authSVC.currentUser.password === '123') {
            // Show error message for admin registration
            alert("Admin account is private and cannot be registered.");
            this.authSVC.currentUser = {
                name: '',
                phone: '',
                userName: '',
                password: '',
                emailId: '',
            };
            return;
        }
        const isLocalData = localStorage.getItem("angular18Local");
        if (isLocalData != null) {
            const localArray = JSON.parse(isLocalData);
            localArray.push(this.authSVC.currentUser);
            localStorage.setItem("angular18Local", JSON.stringify(localArray));
        } else {
            const localArray = [];
            localArray.push(this.authSVC.currentUser);
            localStorage.setItem("angular18Local", JSON.stringify(localArray));
        }

        alert("Registration Success");
        this.router.navigateByUrl('dashboard');
    }
    // ------------------------------------------------------------------------------------------------------------------------------------
    public onLogin(): void {
        const isLocalData = localStorage.getItem("angular18Local");
        if (isLocalData == null) {
            alert("no user found");
            this.authSVC.currentUser = {
              name: '',
              phone: '',
              userName: '',
              password: '',
              emailId: '',
          };
            return;
        }

        const users: IUser[] = JSON.parse(isLocalData);
        const loginUser = users.find((m: IUser) => m.userName == this.authSVC.currentUser.userName && m.password == this.authSVC.currentUser.password);
        if (loginUser == undefined) {
            alert("user name or password is wrong");
            this.authSVC.currentUser = {
              name: '',
              phone: '',
              userName: '',
              password: '',
              emailId: '',
          };
            return;
        }

        this.authSVC.currentUser = loginUser;
        // Check if the user is the admin
        if (this.authSVC.currentUser.userName === 'admin' && this.authSVC.currentUser.password === '123') {
            // Route the user to the admin component
            this.router.navigateByUrl('admin');
        } else {
            // Route the user to the dashboard
            this.router.navigateByUrl('dashboard');
        }
    }
}
