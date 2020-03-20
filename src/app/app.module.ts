import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AntiguedadComponent } from './antiguedad/antiguedad.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FrmempresaComponent } from './empresa/frmempresa/frmempresa.component';
import { ListaComponent } from './cuenta/lista/lista.component';
import { FrmcuentaComponent } from './cuenta/frmcuenta/frmcuenta.component';
import { ListacreedorComponent } from './acreedor/listacreedor/listacreedor.component';
import { FrmacreedorComponent } from './acreedor/frmacreedor/frmacreedor.component';
import { ListachequeComponent } from './checkAcreedor/listacheque/listacheque.component';
import { FrmacreedorchqComponent } from './checkAcreedor/frmacreedorchq/frmacreedorchq.component';
import { FrmchequeComponent } from './check/frmcheque/frmcheque.component';
import { ListproveedorComponent } from './proveedores/listproveedor/listproveedor.component';
import { FrmproveedorComponent } from './proveedores/frmproveedor/frmproveedor.component';
import { FrmpagosComponent } from './pagos/frmpagos/frmpagos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  { MatTableModule }  from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AntiguedadComponent,
    EmpresaComponent,
    FrmempresaComponent,
    ListaComponent,
    FrmcuentaComponent,
    ListacreedorComponent,
    FrmacreedorComponent,
    ListachequeComponent,
    FrmacreedorchqComponent,
    FrmchequeComponent,
    ListproveedorComponent,
    FrmproveedorComponent,
    FrmpagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
