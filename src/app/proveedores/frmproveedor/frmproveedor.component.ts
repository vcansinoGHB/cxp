import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService} from '../../servicios/apiconexion.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider,Usuario } from '../../modelos';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Component({
  selector: 'app-frmproveedor',
  templateUrl: './frmproveedor.component.html',
  styleUrls: ['./frmproveedor.component.css']
})
export class FrmproveedorComponent implements OnInit {

  frmProveedor:FormGroup;
  proveedor:Provider;
  proveedorID:string  = '';
  strError:string     = '';
  sectionName:string  = '';
  currentUser: Usuario;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { 
     this.createForm();
  }

  ngOnInit(): void { 
    this.route.params.subscribe( 
      params => {
         if (params.id_proveedor !== undefined) {
             this.sectionName ="Editar Proveedor"; 
             this.proveedorID = params.id_proveedor.toString();
             this.cargaProveedor(this.proveedorID);
         } else {
           this.sectionName ="Nuevo Proveedor";
         } 

    });

  }

  Submit() {
    var tmpObject:Provider;
    tmpObject = new Provider();

    tmpObject.proveedor_nombre           = this.frmProveedor.value.nombre;
    tmpObject.proveedor_nombreComercial  = this.frmProveedor.value.nombrecomercial;
    tmpObject.proveedor_rfc              = this.frmProveedor.value.rfc;
    tmpObject.proveedor_razonsocial      = this.frmProveedor.value.razonsocial;
    tmpObject.proveedor_tels             = this.frmProveedor.value.telefonos;
    tmpObject.proveedor_telac            = this.frmProveedor.value.telefonoAC;
    tmpObject.proveedor_registroimptos   = this.frmProveedor.value.registroimp;
    tmpObject.proveedor_email            = this.frmProveedor.value.email  ;
    tmpObject.proveedor_emailfacturacion = this.frmProveedor.value.emailfacturacion ;
    tmpObject.proveedor_emailaclientes   = this.frmProveedor.value.emailatencion ;
    tmpObject.proveedor_ciudad           = this.frmProveedor.value.ciudad;
    tmpObject.proveedor_cp               = this.frmProveedor.value.cp;
    tmpObject.proveedor_representante    = this.frmProveedor.value.representante;
    tmpObject.proveedor_diascredito      = this.frmProveedor.value.diascredito;
    tmpObject.proveedor_limitecredito    = this.frmProveedor.value.limitecredito;
    tmpObject.proveedor_activo           = this.frmProveedor.value.activo;
    tmpObject.proveedor_aclientes        = ""
    tmpObject.proveedor_cuenta           = this.frmProveedor.value.cuenta1;
    tmpObject.proveedor_clabe            = this.frmProveedor.value.clabe1;
    tmpObject.proveedor_divisa           = this.frmProveedor.value.divisa1;
    tmpObject.proveedor_banco            = this.frmProveedor.value.banco1;
    tmpObject.proveedor_referencia       = this.frmProveedor.value.referencia1;    
    tmpObject.proveedor_cuenta1          = this.frmProveedor.value.cuenta2;
    tmpObject.proveedor_clabe1           = this.frmProveedor.value.clabe2;
    tmpObject.proveedor_divisa1          = this.frmProveedor.value.divisa2;
    tmpObject.proveedor_banco1           = this.frmProveedor.value.banco2;
    tmpObject.proveedor_referencia1      = this.frmProveedor.value.referencia2;
 
    if (this.frmProveedor.invalid) {
     return;
   }
   
   if (this.proveedorID !== '') {
      
     // Editar
      // --------------------------------------------------------
      this.provider.ProveedoresEdit(this.proveedorID, tmpObject).pipe(
        catchError(err => {
         return throwError(err);
      })).subscribe(
         respuesta => this.router.navigate(['/home/listproveedor']) ,
         err => this.strError = err.message.toString()
      );
 
   } else {
     // Agregar
     // -----------------------------------------------------------
     tmpObject.proveedor_empresaID = 1;	

     this.provider.ProveedoresInsert(tmpObject).pipe(
      catchError(err => {
        return throwError(err);
      })).subscribe(
        respuesta => this.router.navigate(['/home/listproveedor']),
        err => this.strError = err.message.toString() );
   }
 
  }

  Cancelar(){
    this.router.navigate(['/home/listproveedor']);
  }

  createForm() {
    this.frmProveedor = this.formBuilder.group({
      nombre: ['',Validators.required],
      nombrecomercial: [''],
      rfc: [''],
      razonsocial: [''],
      telefonos:[''],
      telefonoAC:[''],
      registroimp:[''],
      email:[''],
      emailfacturacion:[''],
      emailatencion:[''],
      ciudad:[''],
      cp:[''],
      representante:[''],
      diascredito:[0],
      limitecredito:[0],
      activo:[1],
      cuenta1:[''],
      clabe1:[''],
      divisa1:[''],
      banco1:[''],
      referencia1:[''],
      cuenta2:[''],
      clabe2:[''],
      divisa2:[''],
      banco2:[''],
      referencia2:['']      
    });
  }

  private cargaProveedor(id:string) {

    this.currentUser = this.authenticationService.currentUserValue;
     
    this.provider.ProveedoresGetByID(id,this.currentUser[0].empresaID)
        .pipe().subscribe(
            respuesta => {
              this.frmProveedor = this.formBuilder.group({
                nombre: respuesta.proveedor_nombre,
                nombrecomercial: respuesta.proveedor_nombreComercial,
                rfc:respuesta.proveedor_rfc,
                razonsocial:respuesta.proveedor_razonsocial,
                telefonos:respuesta.proveedor_tels,
                telefonoAC:respuesta.proveedor_aclientes,
                registroimp:respuesta.proveedor_registroimptos,
                email:respuesta.proveedor_email,
                emailfacturacion:respuesta.proveedor_emailfacturacion,
                emailatencion:respuesta.proveedor_emailaclientes,
                ciudad:respuesta.proveedor_ciudad,
                cp:respuesta.proveedor_cp,
                representante:respuesta.proveedor_representante,
                diascredito:respuesta.proveedor_diascredito,
                limitecredito:respuesta.proveedor_limitecredito,
                activo:respuesta.proveedor_activo,
                cuenta1:respuesta.proveedor_cuenta,
                clabe1:respuesta.proveedor_clabe,
                divisa1:respuesta.proveedor_divisa,
                banco1:respuesta.proveedor_banco,
                referencia1:respuesta.proveedor_referencia,
                cuenta2:respuesta.proveedor_cuenta1,
                clabe2:respuesta.proveedor_clabe1,
                divisa2:respuesta.proveedor_divisa1,
                banco2:respuesta.proveedor_banco1,
                referencia2:respuesta.proveedor_referencia1
              });                               
            });
  }

}