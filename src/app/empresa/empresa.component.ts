import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiconexionService } from '../servicios/apiconexion.service';
import { Empresa } from '../modelos';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  frmSearch:FormGroup;
  empresaList:Empresa;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder) {             
    this.createForm();
  }

  ngOnInit(): void {
    this.cargaEmpresas("1","");
  }

  createForm() {
    this.frmSearch = this.formBuilder.group({
      nombre: ['']
    });
  }

  private cargaEmpresas(pagina:string,busqueda:string) {
    this.provider.empresasGetAll(pagina,busqueda)
        .pipe().subscribe(respuesta => this.empresaList = respuesta);
  }

  Submit(){
    this.cargaEmpresas("1", this.frmSearch.value.nombre);
  }

}
