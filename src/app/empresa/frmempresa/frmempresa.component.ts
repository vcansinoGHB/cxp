import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { frmEmpresa } from '../../modelos';

@Component({
  selector: 'app-frmempresa',
  templateUrl: './frmempresa.component.html',
  styleUrls: ['./frmempresa.component.css']
})
export class FrmempresaComponent implements OnInit {

  frmEmpresa:FormGroup;
  empresa:frmEmpresa;
  empresaID:string = '';
  strError:string  = '';
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

         if (params.id_empresa !== undefined) {

             
             this.sectionName ="Editar Empresa"; 
             this.empresaID = params.id_empresa.toString();
             this.cargaEmpresa(this.empresaID);

         } else {
           this.sectionName ="Nueva Empresa";
         } 

        }
      );
  }

  Submit() {

    var tmpObject: frmEmpresa;
    tmpObject = new frmEmpresa();

    tmpObject.empresa_nombre    = this.frmEmpresa.value.nombre;
    tmpObject.empresa_domicilio = this.frmEmpresa.value.domicilio;
    tmpObject.empresa_curp      = this.frmEmpresa.value.curp;
    tmpObject.empresa_rfc       = this.frmEmpresa.value.rfc;
    tmpObject.empresa_activo    = this.frmEmpresa.value.activo;
    tmpObject.empresa_etiqueta  = this.frmEmpresa.value.etiqueta;

    if (this.frmEmpresa.invalid) {
      return;
    }
    
    if (this.empresaID !== '') {
       // Editar
       // --------------------------------------------------------
       this.provider.empresaEdit(this.empresaID, tmpObject).pipe(
        catchError(err => {
          //console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
      })
       ).
             subscribe(
                respuesta =>  this.router.navigate(['/home/empresa']) ,
                err =>  this.strError = err.message.toString()
             );

    } else {
      // Agregar
      // -----------------------------------------------------------
      this.provider.empresaCreate(tmpObject)
      .pipe().subscribe(respuesta => this.router.navigate(['/home/empresa']) );

    }

  }

  Cancelar(){
    this.router.navigate(['/home/empresa']);
  }

  createForm() {
    this.frmEmpresa = this.formBuilder.group({
      nombre: ['',Validators.required],
      domicilio: ['',Validators.required],
      rfc: ['',Validators.required],
      curp: [''],
      etiqueta: ['',Validators.required],
      activo: [1]
    });
  }

  private cargaEmpresa(id:string) {
    this.provider.empresaGetByID(id)
        .pipe().subscribe(
            respuesta => {

              this.frmEmpresa = this.formBuilder.group({
                nombre: respuesta.empresa_nombre,
                domicilio: respuesta.empresa_domicilio,
                rfc: respuesta.empresa_rfc ,
                curp: respuesta.empresa_curp  ,
                etiqueta: respuesta.empresa_etiqueta  ,
                activo: respuesta.empresa_activo
              });                               

            });
  }

}
