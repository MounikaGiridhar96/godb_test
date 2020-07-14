import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';


import { AlertService, AuthenticationService } from '../../services';
import { of } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
  
    this.authenticationService.login(this.form.email.value, this.form.password.value)
    .subscribe(users =>
      {
        console.log(users);
        for(let user of users){
          if((user.email==this.form.email.value)&&(user.password==this.form.password.value)){
            console.log(this.form.email.value);
            console.log(this.form.password.value);
             if (user && user.token) {
                         localStorage.setItem('currentUser', JSON.stringify(user));
                         this.authenticationService.currentUserSubject.next(user);
                     }
                     this.router.navigate(['/home']);
          }
      }

    },
            error => {
                this.alertService.error(error);
            });

            
}
}