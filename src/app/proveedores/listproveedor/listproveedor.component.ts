import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { ProveedorList,Usuario } from '../../modelos';
import { AuthenticationService } from '../../servicios/authentication.service';

@Component({
  selector: 'app-listproveedor',
  templateUrl: './listproveedor.component.html',
  styleUrls: ['./listproveedor.component.css']
})

export class ListproveedorComponent implements OnInit {

  frmProveedor:FormGroup;
  proveedorLista:ProveedorList;
  pagina:string;
  pagina2:number;
  currentUser: Usuario;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit(): void {

    this.currentUser = this.authenticationService.currentUserValue;

    this.pagina2 =+this.route.snapshot.queryParamMap.get('pagina')||1;

    this.route.queryParamMap
            .subscribe(params => { 
              this.pagina2 = +params.get('pagina')||1;
              console.log('Query params ',this.pagina2) ;

              this.cargaProveedor(this.pagina2,"",this.currentUser[0].empresaID,"");
          });
       
   
/*
    this.route.params.subscribe( 
      params => {
         if (params.pagina !== undefined) {
            this.pagina  = params.pagina.toString();
         } else {
          this.pagina ="1";
         }
        });*/
        

  }

  Submit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.cargaProveedor(1,
                        this.frmProveedor.value.nombre,
                        this.currentUser[0].empresaID,
                        this.frmProveedor.value.nombrecomer);
  }

  createForm() {
    this.frmProveedor = this.formBuilder.group({
      nombre: [''],
      nombrecomer:['']
    });
  }

private cargaProveedor(pagina:number,search:string,empresaID:number,nombrecomercial:string) {
  this.provider.ProveedoresGetAll(pagina,search,empresaID,nombrecomercial).pipe().subscribe(
        respuesta => this.proveedorLista = respuesta
  );
}

Paginasiguiente(pageNum:any) {

  this.router.navigate(['home/listproveedor'], { queryParams: { pagina: pageNum } }); 
}

}
