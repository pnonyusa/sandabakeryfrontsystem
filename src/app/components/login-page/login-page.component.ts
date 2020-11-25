import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   loginFrm:FormGroup;
   loading = false;
   submitted = false;
   isLoggedIn = false;
   isLoginFailed = false;
   roles: string[] = [];

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private tokenStorage: TokenStorageService,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.loginFrm=this.fb.group({
      emailAddress:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });

    this.onReset();

    if(this.tokenStorage.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenStorage.getUser().roles;
    }

  }



  onReset(){
    this.submitted=false;
    this.loginFrm.reset();
  }

  get formControls(){
    return this.loginFrm.controls;
  }

  submit(){

      if(this.loginFrm.valid){
      
        this.submitted=true;

        var loginDetails={

          'emailAddress':this.loginFrm.get('emailAddress').value,
          'password':this.loginFrm.get('password').value

        }

        this.loading=true;

        this.authService.signIn(loginDetails)
           .pipe(first()).
            subscribe(
                     (response)=>{
      
                       
      
                      this.tokenStorage.saveToken(response.accessToken);
                      this.tokenStorage.saveUser(response);

                        this.isLoginFailed = false;
                          this.isLoggedIn = true;
                         this.roles = this.tokenStorage.getUser().roles;

                         
                         this.toastr.success('you are successfully logged in !!!','SUCCESS',{
                           timeOut:7000
                         });

      
                       this.router.navigate(['/admin-dashboard']);
                     },(error)=>{
      
                           if(error.status==200){
                            
                            
                            
                            this.router.navigate(['/admin-dashboard']);
                           }
                           this.loading=false;
                           console.log(error);
                          
                     }     
           );


      }

  }

}
