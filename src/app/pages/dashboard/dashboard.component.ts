import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  private _oldUser: IUser = { ...this.authSVC.currentUser };

  constructor(
    public authSVC: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = new FormGroup({});
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.authSVC.currentUser.name, Validators.required],
      phone: [this.authSVC.currentUser.phone, Validators.required],
      emailId: [this.authSVC.currentUser.emailId, [Validators.required, Validators.email]],
      userName: [this.authSVC.currentUser.userName, Validators.required]
    });
  
    this._oldUser = { ...this.authSVC.currentUser };
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveUser() {
    if (this.userForm.valid) {
      this._oldUser = { ...this.authSVC.currentUser };
      this.authSVC.currentUser = {
        ...this.authSVC.currentUser,
        ...this.userForm.value
      };
      this.toggleEditMode();
      this.updateLocalStorage();
      alert("User data was edited successfully");
    }
  }

  cancelEdit() {
    this.userForm.patchValue(this._oldUser);
    this.toggleEditMode();
  }

  private updateLocalStorage() {
    const localData = localStorage.getItem("angular18Local");
    if (localData == null) return;
  
    const allUsers: IUser[] = JSON.parse(localData);
    const newUsers: IUser[] = allUsers.filter((user: IUser) => user.userName !== this._oldUser.userName);
    if (newUsers == undefined) return;
    newUsers.push(this.authSVC.currentUser);
    localStorage.setItem("angular18Local", JSON.stringify(newUsers));
  }
}


