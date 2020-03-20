import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChequeAcreedor } from '../../modelos';


@Component({
  selector: 'app-listacheque',
  templateUrl: './listacheque.component.html',
  styleUrls: ['./listacheque.component.css']
})
export class ListachequeComponent implements OnInit {

  frmAcreedor:FormGroup;
  cuentabancaria  = [];
  acreedoresLista = [];
  chequeList :ChequeAcreedor;

  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { 
      this.createForm();             
  }

  ngOnInit(): void {
    this.loadAllCuentaBancaria();
    this.loadAllAcreedores();
    this.cargaCheques(1,"","","",1);
  }

  Submit() {
    
    this.cargaCheques(1,
                      this.frmAcreedor.value.cheque,
                      this.frmAcreedor.value.cuenta,
                      this.frmAcreedor.value.acreedor,
                      1);
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
    this.frmAcreedor = this.formBuilder.group({
      cheque: [''],
      cuenta:[''],
      acreedor:['']
    });
  }

 private cargaCheques(pagina:number,
                      pcheque:string,
                      pcuentaID:string,
                      pacreedorID:string,
                      pempresaID:number) {

this.provider.ChequeAcreedorGetAll(pagina,pcheque,pcuentaID,pacreedorID,pempresaID)
.pipe().subscribe(respuesta => this.chequeList = respuesta);

}

}
