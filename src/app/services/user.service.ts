import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrlProd from './helperProd';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${baseUrlProd}/users/`,user);
    }

}
