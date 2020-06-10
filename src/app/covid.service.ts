import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor( public http:HttpClient ) { }
  public api_url ="https://covid19-brazil-api.now.sh/api/report/v1"
  public api_url_fio ="https://bigdata-api.fiocruz.br/numero/casos/pais/Brasil";

  public getDadosCovid(){
    let covid:string;

    //if(dados=="countries"){covid = `${this.api_url}${dados}`;        }
    //if(){;        }
    covid = `${this.api_url}`
    console.log(covid);
    return this.http.get(covid);
    
  }
  public getDadosCovidBrasil(){
    let covid:string;

    //if(dados=="countries"){covid = `${this.api_url}${dados}`;        }
    //if(){;        }
    covid = `${this.api_url}/brazil`
    console.log(covid);
    return this.http.get(covid);
    
  }
  public getDadosPaises(){
    let covid:string;
    covid =`${this.api_url}/countries`
    return this.http.get(covid);
  }

public getDadosCovidFioCruz(){
    let covid:string;

    //if(dados=="countries"){covid = `${this.api_url}${dados}`;        }
    //if(){;        }
    covid = `${this.api_url_fio}`
    console.log(covid);
    return this.http.get(covid);
    
  }
 
  
}
