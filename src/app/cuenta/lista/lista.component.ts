import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { CuentaLista } from '../../modelos';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listaCuenta:CuentaLista;
  frmSearch:FormGroup;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.cargaCuentasBancarias("1","");
  }

  createForm() {
    this.frmSearch = this.formBuilder.group({
      cuenta: ['']
    });
  }

  private cargaCuentasBancarias(pagina:string,
                                busqueda:string) {

    this.provider.cuentaBancariaGetAll(pagina,busqueda)
        .pipe().subscribe(respuesta => this.listaCuenta = respuesta);

  }

  Submit(){
    this.cargaCuentasBancarias("1", this.frmSearch.value.cuenta);
  }

}
