import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: Usuario;
  nombreUser:string;
  nombreEmpresa:string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.nombreUser = this.currentUser[0].nombre;
    this.nombreEmpresa = this.currentUser[0].empresa_etiqueta;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.Logout();
    this.router.navigate(['/login']);
  }

}
