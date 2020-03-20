import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import {Cuenta } from '../../modelos';

@Component({
  selector: 'app-frmcuenta',
  templateUrl: './frmcuenta.component.html',
  styleUrls: ['./frmcuenta.component.css']
})
export class FrmcuentaComponent implements OnInit {

  frmCuenta:FormGroup;
  cuenta:Cuenta;
  cuentaID:string    = '';
  strError:string    = '';
  sectionName:string = '';
  bancosList  = [];

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
     this.createForm();
   }

  ngOnInit(): void {
    this.loadAllBanks();
    this.route.params.subscribe( 
      params => {

         if (params.id_cuenta !== undefined) {

             
             this.sectionName ="Editar Cuenta Bancaria"; 
             this.cuentaID = params.id_cuenta.toString();
             this.cargaCuentaBancaria(this.cuentaID);

         } else {
           this.sectionName ="Nueva Cuenta Bancaria";
         } 

        }
      );

  }

  Cancelar(){
    this.router.navigate(['/home/listacuenta']);
  }

  Submit() {

   var tmpObject:Cuenta;
   tmpObject = new Cuenta();

   tmpObject.cuenta_numero  = this.frmCuenta.value.ncuenta;
   tmpObject.cuenta_bancoID = this.frmCuenta.value.banco;
   tmpObject.cuenta_moneda  = this.frmCuenta.value.moneda;
   tmpObject.cuenta_activo  = this.frmCuenta.value.activo;

   if (this.frmCuenta.invalid) {
    return;
  }
  
  if (this.cuentaID !== '') {
     
    // Editar
     // --------------------------------------------------------
     this.provider.cuentaBancariaEdit(this.cuentaID, tmpObject).pipe(
       catchError(err => {
        return throwError(err);
     })).subscribe(
        respuesta => this.router.navigate(['/home/listacuenta']) ,
        err => this.strError = err.message.toString()
     );

  } else {
    // Agregar
    // -----------------------------------------------------------
    this.provider.cuentaBancariaCreate(tmpObject)
    .pipe().subscribe(respuesta => this.router.navigate(['/home/listacuenta']) );
  }


  }

  private loadAllBanks() {
    this.provider.BancosGetAll()
        .pipe().subscribe(respuesta => this.bancosList = respuesta);
  }

  createForm() {
    this.frmCuenta = this.formBuilder.group({
      ncuenta: ['',Validators.required],
      banco: ['',Validators.required],
      moneda: ['',Validators.required],
      activo: [1]
    });
  }


  private cargaCuentaBancaria(id:string) {

    this.provider.cuentaGetByID(id)
        .pipe().subscribe(
            respuesta => {
              this.frmCuenta = this.formBuilder.group({
                ncuenta: respuesta.cuenta_numero,
                banco: respuesta.cuenta_bancoID,
                moneda: respuesta.cuenta_moneda,
                activo: respuesta.cuenta_activo
              });                               
            });
  }



}
