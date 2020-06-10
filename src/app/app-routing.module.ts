import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
 {path: 'app',
    loadChildren:() => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
    //  {
   //   path: 'inserir',
  //  loadChildren: () => import('./inserir/inserir.module').then( m => m.InserirPageModule)
 //}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
