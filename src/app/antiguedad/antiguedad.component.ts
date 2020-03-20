import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Antiguo, Usuario } from '../modelos';
import { ApiconexionService } from '../servicios/apiconexion.service';
import { AuthenticationService } from '../servicios/authentication.service';

@Component({
  selector: 'app-antiguedad',
  templateUrl: './antiguedad.component.html',
  styleUrls: ['./antiguedad.component.css']
})
export class AntiguedadComponent implements OnInit {
  locacion  = [];
  proveedor = [];
  saldosAnt :Antiguo;
  form:FormGroup;
  currentUser:Usuario;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {

     this.form = this.formBuilder.group({
       locacionid: [1],
       proveedorid:['']
     });

  }

  ngOnInit(): void {
    this.loadAllLocaciones();
    this.loadAllProveedores();
  }

  private loadAllLocaciones() {
    this.provider.getAllLocaciones()
        .pipe().subscribe(respuesta => this.locacion = respuesta);
  }

  private loadAllProveedores() {

    this.currentUser = this.authenticationService.currentUserValue;

    this.provider.getProveedoresByEmpresaID(this.currentUser[0].empresaID)
        .pipe().subscribe(respuesta => this.proveedor = respuesta);
  }

  submit() {

    this.currentUser = this.authenticationService.currentUserValue;

    this.provider.getAntiguedadSaldo(this.form.value.locacionid,
                                     this.form.value.proveedorid,
                                     this.currentUser[0].empresaID)
    .subscribe(respuesta => this.saldosAnt = respuesta);
    
  }

}
