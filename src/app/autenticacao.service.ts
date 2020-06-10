import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor( public ngFireAuth: AngularFireAuth,
              public ngFireBase: AngularFireDatabase) { }

  loginNoFireBase(email, password){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  insereNoFireBase(email, password){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }
  //adicionar no banco de dados.
}