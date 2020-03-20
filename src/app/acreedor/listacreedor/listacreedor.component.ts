import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { AcreedorList } from '../../modelos';

@Component({
  selector: 'app-listacreedor',
  templateUrl: './listacreedor.component.html',
  styleUrls: ['./listacreedor.component.css']
})
export class ListacreedorComponent implements OnInit {

  listaAcreedor:AcreedorList;
  frmAcreedor:FormGroup;

  constructor(private provider: ApiconexionService,
             private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.cargaAcreedores("1","");
  }

  Submit(){
    this.cargaAcreedores("1", this.frmAcreedor.value.nombre);
  }

  createForm() {
    this.frmAcreedor = this.formBuilder.group({
      nombre: ['']
    });
  }

private cargaAcreedores(pagina:string,
                        busqueda:string) {

this.provider.acreedorGetAll(pagina,busqueda,1)
.pipe().subscribe(respuesta => this.listaAcreedor = respuesta);

}

}
