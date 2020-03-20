import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Provider,ProveedorList,ChqAcreedor,CuentaBancaria,Locacion,Proveedor,Antiguo,Empresa,frmEmpresa,CuentaLista,BancoList,Cuenta,AcreedorList,Acreedor,ChequeAcreedor } from '../modelos';

@Injectable({
  providedIn: 'root'
})
export class ApiconexionService {

  strUrl:string = 'https://wssia.translamex.com/cxpservice/';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  SelectAcreedor(idempresa:string) {
    return this.http.get<Acreedor[]>(this.strUrl + "api/getAcreedores?empresaID="+ idempresa);    
  }

  SelectCuentaBancaria () {
    return this.http.get<CuentaBancaria[]>( this.strUrl + "api/getCuentaBancaria");    
  }

  ProveedoresInsert(data:Provider): Observable<Provider> {
    const body = JSON.stringify(data);
    return this.http.post<Provider>(this.strUrl + 'api/insertProveedor', body, this.httpOptions);
  }

  ProveedoresEdit(id:string, objCuenta:Provider):Observable<Provider> {
     const body = JSON.stringify(objCuenta);
     return this.http.put<Provider>(this.strUrl + "api/editProveedor?proveedorID="+ id,body,this.httpOptions);
  }

  ProveedoresGetByID(id:string,empresaID:string) {
     return this.http.get<Provider>(this.strUrl + "api/getProveedorByID?proveedorID="+id+"&empresaID="+ empresaID); 
  }

  ProveedoresGetAll(pagina:number,search:string,empresaID:number,nombrecomercial:string) {
     const body = {"PaginaActual":pagina,"Busqueda":search,"empresaID":empresaID,"Nombrecomercial":nombrecomercial}
     return this.http.post<ProveedorList>( this.strUrl + "api/getProveedoresAll", body);
  }

  ChequeaAcreedorInsert(data:ChqAcreedor): Observable<ChqAcreedor> {
    return this.http.post<ChqAcreedor>(this.strUrl + 'api/insertChequeAcreedor', JSON.stringify(data), this.httpOptions);
  }

  ChequeAcreedorEdit(id:string, objCuenta:ChqAcreedor):Observable<ChqAcreedor> {
    const body = JSON.stringify(objCuenta);
    return this.http.put<ChqAcreedor>( this.strUrl + "api/editChequeAcreedor?acreedorChequeID="+ id,body,this.httpOptions);
  }

  ChequeAcreedorGetByID(id:string) {
    return this.http.get<ChqAcreedor>(this.strUrl + "api/getChequeAcreedorByID?chequeAcreedorID="+ id); 
  }

  ChequeAcreedorGetAll(pagina:number,pcheque:string,
                       pcuentaID:string,pacreedorID:string,pempresaID:number) {

    const body = {"PaginaActual":pagina,"Cheque":pcheque,"CuentaID":pcuentaID,"AcreedorID":pacreedorID,"EmpresaID":pempresaID}
    return this.http.post<ChequeAcreedor>( this.strUrl + "api/getChequeAcreedorGetAll", body);
  }

  acreedorInsert(data:Acreedor): Observable<Acreedor> {
    return this.http.post<Acreedor>(this.strUrl + 'api/insertAcreedor', JSON.stringify(data), this.httpOptions);
  }

  acreedorEdit(id:string, objCuenta:Acreedor):Observable<Acreedor> {
    const body = JSON.stringify(objCuenta);
    return this.http.put<Acreedor>( this.strUrl + "api/editAcreedor?acreedorID="+ id,body,this.httpOptions);
  }
  
  acreedorGetByID(id:string) {
    return this.http.get<Acreedor>(this.strUrl + "api/getAcreedorByID?acreedorID="+ id);    
  }

  acreedorGetAll(paginactual:string,
                 search:string,
                 empresaID:number) {

    const body = {"PaginaActual":paginactual,"Busqueda":search,"EmpresaID":empresaID};
    return this.http.post<AcreedorList>( this.strUrl + "api/getAcreedorGetAll", body);
  }

  cuentaBancariaCreate(data:Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(this.strUrl + 'api/insertCuentaBancaria', JSON.stringify(data), this.httpOptions);
  }
  
  cuentaBancariaEdit(id:string, objCuenta:Cuenta):Observable<Cuenta> {
    const body = JSON.stringify(objCuenta);
    return this.http.put<Cuenta>( this.strUrl + "api/editCuentaBancaria?cuentaID="+ id,body,this.httpOptions);
  }

  cuentaGetByID(id:string){
    return this.http.get<Cuenta>( this.strUrl + "api/getCuentaBancariaByID?cuentaID="+ id);    
  }

  BancosGetAll() {
    return this.http.get<BancoList[]>( this.strUrl + "api/getBancos");    
  }

  cuentaBancariaGetAll(paginActual:string,Search:string) {            
    const body = {"PaginaActual":paginActual,"Busqueda":Search};    
    return this.http.post<CuentaLista>( this.strUrl + "api/getCuentaBancariaGetAll", body);
  }

  empresaCreate(data:frmEmpresa): Observable<frmEmpresa> {
    return this.http.post<frmEmpresa>(this.strUrl + 'api/insertEmpresa', JSON.stringify(data), this.httpOptions);
  }

  empresaEdit(id:string,empresa:frmEmpresa): Observable<frmEmpresa> {   
   const body =JSON.stringify(empresa);
   return this.http.put<frmEmpresa>( this.strUrl + "api/editEmpresa?empresaID="+ id,body,this.httpOptions);    
  }

  empresaGetByID(id:string){
    return this.http.get<frmEmpresa>( this.strUrl + "api/getEmpresaByID?empresaID="+ id);    
  }

  empresasGetAll(pagactual:string,search:string) {    
    const body ={"PaginaActual":pagactual,"Busqueda":search};
    return this.http.post<Empresa>( this.strUrl + "api/getEmpresaGetAll", body);
  }

  getAllLocaciones() {
    return this.http.get<Locacion[]>( this.strUrl + "api/getLocaciones");    
  }

  getProveedoresByEmpresaID(id_empresa: string) {
    return this.http.get<Proveedor[]>( this.strUrl + "api/getProveedores?empresaID="+ id_empresa);    
  }

  getAntiguedadSaldo(id_locacion:number,id_proveeedor:number,id_empresa:number) {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    const body = {"LocacionID":id_locacion,"ProveedorID":id_proveeedor,"EmpresaID":id_empresa}
    return this.http.post<Antiguo>( this.strUrl + "api/getAntiguedadSaldo", body); 
  }

}
