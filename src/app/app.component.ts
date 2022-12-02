import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { User } from './models/models';
import { DbOperation } from './services/db-operation';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD.UI';
  registerForm : FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  buttonText: string = "Submit";
  dbops: DbOperation;

  constructor(private toastr: ToastrService,
      private fb: FormBuilder,
      private userService: UserService  
    ) {}

  ngOnInit() {
    this.setFromState();
    this.getAllUsers();
  }

  setFromState() {
    this.buttonText = "Submit";
    this.dbops = DbOperation.create;

    this.registerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    switch (this.dbops) {
      case DbOperation.create:
          this.userService.createUser(this.registerForm.value).subscribe(res => {
            this.toastr.success("User Added");         
            this.onCancel();
            this.ngOnInit();
          });
        break;
      case DbOperation.update:
          this.userService.updateUser(this.registerForm.value).subscribe(res => {
            this.toastr.success("User Updated");         
            this.onCancel();
            this.ngOnInit();
          });
        break;

      default:
        break;
    }
  }
  
  onCancel(){
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = DbOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  updateUser(userId: number) {
    this.buttonText = "Update";
    this.dbops = DbOperation.update;

    let user = this.users.find((u : User) => u.id === userId);
    this.registerForm.patchValue(user);
  }

  deleteUser(id: number) {    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
      }).then((result) => {
      if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe(res => {
            this.getAllUsers();
            // this.toastr.success("Deleted Successfully!")
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
              )    
          });
      } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
      ) {
          Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
          )
      }
      })
  }

}
