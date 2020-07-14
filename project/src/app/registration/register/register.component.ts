import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, UserService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ){
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }
   
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: [null,[ Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        mobileno: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        password: [null, [Validators.required,Validators.minLength(6)]],
        confirmpassword: [null, [Validators.required]],
    });
}
get form() {
   return this.registerForm.controls;

 }

onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
console.log(this.registerForm.get('firstName').value);

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
