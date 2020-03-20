import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './home/home.component';
import { AntiguedadComponent } from './antiguedad/antiguedad.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FrmempresaComponent } from './empresa/frmempresa/frmempresa.component';
import { ListaComponent } from './cuenta/lista/lista.component';
import { FrmcuentaComponent } from './cuenta/frmcuenta/frmcuenta.component';
import { FrmacreedorComponent } from './acreedor/frmacreedor/frmacreedor.component';
import { ListacreedorComponent } from './acreedor/listacreedor/listacreedor.component';
import { ListachequeComponent } from './checkAcreedor/listacheque/listacheque.component';
import { FrmacreedorchqComponent } from './checkAcreedor/frmacreedorchq/frmacreedorchq.component';
import { ListproveedorComponent } from './proveedores/listproveedor/listproveedor.component';
import { FrmproveedorComponent } from './proveedores/frmproveedor/frmproveedor.component';
import { FrmpagosComponent } from './pagos/frmpagos/frmpagos.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
     children: [ 
      { path: 'antiguedad', component: AntiguedadComponent },
      { path: 'empresa', component: EmpresaComponent },
      { path: 'nEmpresa', component: FrmempresaComponent },
      { path: 'eEmpresa/:id_empresa', component: FrmempresaComponent },
      { path: 'listacuenta', component: ListaComponent },
      { path: 'nCuenta', component: FrmcuentaComponent },
      { path: 'eCuenta/:id_cuenta', component: FrmcuentaComponent },
      { path: 'listacreedor', component: ListacreedorComponent },
      { path: 'nAcreedor', component: FrmacreedorComponent },
      { path: 'eAcreedor/:id_acreedor', component: FrmacreedorComponent },
      { path: 'listchqacr', component: ListachequeComponent },
      { path: 'nchqacr', component: FrmacreedorchqComponent },
      { path: 'echqacr/:id_cheque', component: FrmacreedorchqComponent },
      { path: 'listproveedor', component:ListproveedorComponent },
      { path: 'nproveedor', component:FrmproveedorComponent },
      { path: 'eproveedor/:id_proveedor', component:FrmproveedorComponent },
      { path:'pagos', component:FrmpagosComponent}
   ]
  },
  { path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
