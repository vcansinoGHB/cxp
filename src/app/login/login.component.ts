import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  frmLogin:FormGroup;
  loading = false;
  errores = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,) {  }

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      empresaid: ['tmx'],
      usuario:['',Validators.required],
      clave:['',Validators.required]
    });
  }

  get f() { return this.frmLogin.controls; }

  Login() {

    this.loading = true;
    this.errores = false;

    if (this.frmLogin.invalid) {
      return;
    }

    this.authenticationService.Login(this.f.usuario.value, 
                                     this.f.clave.value,
                                     this.f.empresaid.value).pipe(first())
    .subscribe( data => {
                  this.errores = false;
                  this.router.navigate(['/home']);
              },
              error => {
                  this.loading = false;
                  this.errores = true;
              });
     }

}