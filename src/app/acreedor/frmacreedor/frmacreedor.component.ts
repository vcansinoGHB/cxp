import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import {Acreedor } from '../../modelos';

@Component({
  selector: 'app-frmacreedor',
  templateUrl: './frmacreedor.component.html',
  styleUrls: ['./frmacreedor.component.css']
})
export class FrmacreedorComponent implements OnInit {

  frmAcreedor:FormGroup;
  acreedor:Acreedor;
  acreedorID:string  = '';
  strError:string    = '';
  sectionName:string = '';

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { 
      this.createForm();
  }

  ngOnInit(): void {

    this.route.params.subscribe( 
      params => {

         if (params.id_acreedor !== undefined) {             
             this.sectionName ="Editar Acreedor"; 
             this.acreedorID = params.id_acreedor.toString();
             this.cargaAcreedor(this.acreedorID);

         } else {
           this.sectionName ="Nuevo Acreedor";
         } 

        }
      );

  }

  Cancelar(){
    this.router.navigate(['/home/listacreedor']);
  }

  Submit() {

    var tmpObject:Acreedor;
    tmpObject = new Acreedor();
 
    tmpObject.acreedor_nombre    = this.frmAcreedor.value.nombre;
    tmpObject.acreedor_direccion = this.frmAcreedor.value.direccion;
    tmpObject.acreedor_telefono  = this.frmAcreedor.value.telefono;
    tmpObject.acreedor_activo    = this.frmAcreedor.value.activo;
    tmpObject.acreedor_empresaID = 1;
 
    if (this.frmAcreedor.invalid) {
     return;
   }
   
   if (this.acreedorID !== '') {
      
     // Editar
      // --------------------------------------------------------
      this.provider.acreedorEdit(this.acreedorID, tmpObject).pipe(
        catchError(err => {
         return throwError(err);
      })).subscribe(
         respuesta => this.router.navigate(['/home/listacreedor']) ,
         err => this.strError = err.message.toString()
      );
 
   } else {
     // Agregar
     // -----------------------------------------------------------
     this.provider.acreedorInsert(tmpObject)
     .pipe().subscribe(respuesta => this.router.navigate(['/home/listacreedor']) );
   }
 

  }

  createForm() {
    this.frmAcreedor = this.formBuilder.group({
      nombre: ['',Validators.required],
      direccion: [''],
      telefono: [''],
      activo: [1]
    });
  }

  private cargaAcreedor(id:string) {

    this.provider.acreedorGetByID(id)
        .pipe().subscribe(
            respuesta => {
              this.frmAcreedor = this.formBuilder.group({
                nombre: respuesta.acreedor_nombre,
                direccion: respuesta.acreedor_direccion,
                telefono: respuesta.acreedor_telefono,
                activo: respuesta.acreedor_activo
              });                               
            });
  }

}
