import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    @Inject('apiUrl') private apiUrl,
    private http: HttpClient
  ) { }


  addCargo(obj){
  return this.http.post(this.apiUrl + '/todo', obj);
}


  getAllCargos(){
    return this.http.get(this.apiUrl+'/todo');
}


  updateCargo(obj){
    return this.http.put(this.apiUrl+'/todo',obj);
}

  deleteCargo(id){
    return this.http.delete(this.apiUrl + "/todo/" + id);
}

}

