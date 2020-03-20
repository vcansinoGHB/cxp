import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChqAcreedor } from '../../modelos';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Component({
  selector: 'app-frmacreedorchq',
  templateUrl: './frmacreedorchq.component.html',
  styleUrls: ['./frmacreedorchq.component.css']
})
export class FrmacreedorchqComponent implements OnInit {

  frmCheque:FormGroup;
  cuentabancaria  = [];
  acreedoresLista = [];
  
  chequeID:string    = '';
  strError:string    = '';
  sectionName:string = '';

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
      this.createForm()
  }

  ngOnInit(): void {
    this.loadAllCuentaBancaria();
    this.loadAllAcreedores();

    this.route.params.subscribe( 
      params => {

         if (params.id_cheque !== undefined) {
             
             this.sectionName ="Editar Cheque Acreedor"; 
             this.chequeID = params.id_cheque.toString();
             this.cargaChequeAcreedor(this.chequeID);

         } else {
           this.sectionName ="Nueva Cheque Acreedor";
         } 

        }
      );


  }

  Submit() {

    var tmpObject:ChqAcreedor;
    tmpObject = new ChqAcreedor();
 
    tmpObject.numero     = this.frmCheque.value.cheque;
    tmpObject.concepto   = this.frmCheque.value.concepto;
    tmpObject.fecha      = this.frmCheque.value.fecha;
    tmpObject.importe    = this.frmCheque.value.importe;
    tmpObject.moneda     = this.frmCheque.value.moneda
    tmpObject.tipocambio =  this.frmCheque.value.tc;
    tmpObject.cuentaID   = this.frmCheque.value.cuenta;
    tmpObject.acreedorID = this.frmCheque.value.acreedor;

    tmpObject.empresaID = 1;
 
    if (this.frmCheque.invalid) {
     return;
   }
   
   if (this.chequeID !== '') {
      
     // Editar
     // --------------------------------------------------------
      this.provider.ChequeAcreedorEdit(this.chequeID, tmpObject).pipe(
        catchError(err => {
         return throwError(err);
      })).subscribe(
         respuesta => this.router.navigate(['/home/listchqacr']) ,
         err => this.strError = err.message.toString()
      );
 
   } else {
     // Agregar
     // -----------------------------------------------------------
     this.provider.ChequeaAcreedorInsert(tmpObject)
     .pipe( catchError(err => {
      return throwError(err);
      })).subscribe(
             respuesta => this.router.navigate(['/home/listchqacr']),
             err => this.strError = err.message.toString() );
      }
 

  }

  Cancelar() {
    this.router.navigate(['/home/listchqacr']);
  }

  private loadAllCuentaBancaria() {
    this.provider.SelectCuentaBancaria()
        .pipe().subscribe(respuesta => this.cuentabancaria = respuesta);
  }

  private loadAllAcreedores() {   
    this.provider.SelectAcreedor("1")
        .pipe().subscribe(respuesta => this.acreedoresLista = respuesta);
  }

  createForm() {
    this.frmCheque = this.formBuilder.group({
       cheque: ['',Validators.required],
       concepto: ['',Validators.required],
       fecha: ['',Validators.required],
       importe: ['',Validators.required],
       moneda: ['',Validators.required],
       tc: [''],
       cuenta: ['',Validators.required],
       acreedor: ['',Validators.required]
    });
  }

  cargaChequeAcreedor(id:string){

    this.provider.ChequeAcreedorGetByID(id)
    .pipe().subscribe(
      respuesta => {
        this.frmCheque = this.formBuilder.group({
          cheque: respuesta.numero,
          concepto: respuesta.concepto,
          fecha: respuesta.fecha,
          importe: respuesta.importe,
          moneda: respuesta.moneda,
          tc:respuesta.tipocambio,
          cuenta:respuesta.cuentaID,
          acreedor:respuesta.acreedorID
        });                               
      });

  }

}
