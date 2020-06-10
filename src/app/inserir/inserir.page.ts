import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../autenticacao.service'
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.page.html',
  styleUrls: ['./inserir.page.scss'],
})
export class InserirPage {

  constructor(public autenticao: AutenticacaoService,
      public router:Router,
      public toast:ToastController
    ) { }

  public email:string;
  public senha:string;
  public mensagem:string;

cadastrar(){
  this.autenticao.insereNoFireBase(this.email,this.senha)
  .then((res) =>{
    this.router.navigate(['app/tabs/tab3']);
  })
  .catch((error) =>{
        this.mensagem ="Erro ao inserir Usuário."
        this.exibeMensagem();
    });
  }
  
  async exibeMensagem(){
    const toast = await this.toast.create({
      message: this.mensagem,
      duration:1500
  })

}



}
