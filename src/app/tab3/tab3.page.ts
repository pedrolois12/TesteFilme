import { Component } from '@angular/core';
import { Router } from '@angular/router'
import {ToastController} from '@ionic/angular'
import { AutenticacaoService } from '../autenticacao.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['style.css']
})



export class Tab3Page  {

  constructor(public autenticacaoService:AutenticacaoService,
              public router:Router,
              public toastController:ToastController) {}

              
  public email:string    ="";
  public senha:string    ="";
  public mensagem:string ="";

  insereUsuario(){
    this.autenticacaoService.loginNoFireBase(this.email, this.senha)
    .then((res)=>{
        this.router.navigate(['app/tabs/tab2']);
  
    })
    .catch((error)=>{
      this.mensagem="Erro Logar!"
      this.exibeMensagem();
    }) 
  }

  async exibeMensagem(){
    const toast = await this.toastController.create({
      message:this.mensagem,
      duration:1700
    });
    toast.present();
  }
  
  cadastrar(){
      this.router.navigate(['app/tabs/inserir']);
  }

}
