import { Component,OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Usuario,CuentaLista } from '../../modelos';
import { ApiconexionService } from '../../servicios/apiconexion.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
 name: string;
 position: number;
 weight: number;
 symbol: string;
 moneda:string;
 concepto:string;
 fechavencimiento:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', moneda:'MXN', concepto:'TOURS',fechavencimiento:'01/03/2020'},
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', moneda:'USD', concepto:'TOURS',fechavencimiento:'02/03/2020'},
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', moneda:'MXN', concepto:'TOURS',fechavencimiento:'03/03/2020'},
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', moneda:'USD', concepto:'TOURS',fechavencimiento:'04/03/2020'},
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', moneda:'MXN', concepto:'TOURS',fechavencimiento:'05/03/2020'},
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', moneda:'USD', concepto:'TOURS',fechavencimiento:'06/03/2020'},
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', moneda:'MXN', concepto:'TOURS',fechavencimiento:'07/03/2020'},
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', moneda:'USD', concepto:'TOURS',fechavencimiento:'08/03/2020'},
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', moneda:'MXN', concepto:'TOURS',fechavencimiento:'09/03/2020'},
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', moneda:'USD', concepto:'TOURS',fechavencimiento:'11/03/2020'},
];

@Component({
  selector: 'app-frmpagos',
  templateUrl: './frmpagos.component.html',
  styleUrls: ['./frmpagos.component.css']
})
export class FrmpagosComponent implements OnInit {
  model:any;
  locacion  = [];
  proveedor = [];
  submitted = false;
  currentUser:Usuario;
  frmPagos:FormGroup;
  listaCuenta:CuentaLista;
  calendarioFlag = false;
  
  displayedColumns: string[];
  dataSource = null;
  selection  = null;
 
  constructor(private provider: ApiconexionService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { 

    this.loadForma();

    this.displayedColumns = ['select', 'position', 'name', 'weight', 'symbol','moneda','concepto','fechavencimiento'];

    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.selection = new SelectionModel<PeriodicElement>(true, []);             
  }

  get f() { return this.frmPagos.controls; }

  loadForma() {

    this.frmPagos = this.formBuilder.group({

      locacionid: [1,Validators.required],
      proveedorid:['',Validators.required],
      concepto:['',Validators.required],
      cheque:['',Validators.required],
      fecha:['',Validators.required],
      banco:['',Validators.required]

    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit(): void {
    this.loadAllLocaciones();
    this.loadAllProveedores();
    this.loadAllCuentas();
  }

  private loadAllCuentas() {

    this.provider.cuentaBancariaGetAll("1","")
     .pipe()
      .subscribe( respuesta => { this.listaCuenta = respuesta[0].cuentaList } );         

  }

  private loadAllLocaciones() {
     this.provider.getAllLocaciones()
        .pipe().subscribe(respuesta => this.locacion = respuesta);
  }

  private loadAllProveedores() {

    this.currentUser = this.authenticationService.currentUserValue;

    this.provider.getProveedoresByEmpresaID(this.currentUser[0].empresaID)
        .pipe().subscribe(respuesta => this.proveedor = respuesta);
  }

 

 
  Pagar(event) {
  
    //console.log(event.explicitOriginalTarget.attributes.id);
    if (event.explicitOriginalTarget.attributes.id !== undefined) {

    if (event.explicitOriginalTarget.attributes.id.nodeValue === "entrar") {

      this.submitted = true;

      if (this.frmPagos.invalid) {
        return;
      }

      if (this.submitted ) {
         alert("hola");
      }

    }

   
  }

  }

}
