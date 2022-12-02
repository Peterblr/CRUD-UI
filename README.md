# CRUDUI

Created with .NET 6 and Angular 14 and Bootstrap 5

![image](https://github.com/Peterblr/CRUD-UI/blob/master/src/screenshots/1.PNG)

Description main steps:

1. Install Bootstrap (https://www.npmjs.com/package/bootstrap):
    1.1 --> npm i bootstrap   
    1.2. add styles to angular.json -->
         "styles": [
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css" 
            ],

2. Install font-awesome (https://www.npmjs.com/package/font-awesome):
    2.1. -->  npm i font-awesome
    2.2 add styles to angular.json -->
         "styles": [
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "./node_modules/font-awesome/css/font-awesome.min.css" 
            ],

3. Install toastr (https://www.npmjs.com/package/ngx-toastr):
    3.1. --> npm i ngx-toastr 
    3.2. --> npm i @angular/animations
    3.3. add styles to angular.json -->
         "styles": [
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "./node_modules/font-awesome/css/font-awesome.min.css", 
              "node_modules/ngx-toastr/toastr.css"
            ],
    3.4. add ToastrModule to app.module.ts -->
        import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
        import { ToastrModule } from 'ngx-toastr';
    3.5. add ToastrModule to app NgModule -->
         imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot()
            ],

4. Install Sweetalert2 (https://www.npmjs.com/package/sweetalert2):
    4.1. --> npm i sweetalert2
    4.2. use Sweetalert2 - add import to Component -->
        import Swal from 'sweetalert2'
        and use (https://sweetalert2.github.io/) -->
        
         Swal.fire("Hello!");
         Swal.fire("Ooops...", "Something wrong!", "error");
         Swal.fire("Ooops...", "Something wrong!", "success");

         ***

        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
            )
        }
        })

5. Update strict to 'false' into tsconfig.json:

    ...
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "noImplicitOverride": true,
    ...
