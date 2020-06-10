import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InserirPageRoutingModule } from './inserir-routing.module';
import { InserirPage } from './inserir.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../autenticacao.service'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InserirPageRoutingModule
  ],
  declarations: [InserirPage]
})
export class InserirPageModule {}
