import { Component, ComponentFactoryResolver, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CovidService } from '../covid.service';
import { LoadingController, IonInfiniteScroll } from '@ionic/angular'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['style.css'],
  providers: [CovidService],
  
  
})



export class Tab2Page implements OnInit {
  constructor( public covidService:CovidService, public loadingController: LoadingController ) {}
  public detalhes_dia = new Array<any>();
  public detalhes_brasil = new Array<any>();
  public detalhes_paises = new Array<any>();
  public detalhes_dia_fio = new Array<any>();
  public paises_morte:string;
  public paises_casos:string;
  public paises_confir:string;
  public paises_recov:string;
  public paises_updat:string;
  public paises_country:string ="Brazil";
  public select_paises:string="Brazil";
  public total_mortes;
  public confirmed;
  public updated;
  public recovery;
  public case;
  public recente:string="0";
  public dia_recente:string="0";
  public teste: any[];
  public casos_sel_dia:string="0";
  public mortes_sel_dia:string="0";
  public data_sel:string="0";
  public i=0;
  public select:string;
  public LineChart=[];

  @ViewChild('lineChart', {static: false}) public myCanvas: ElementRef;
  @ViewChild('CanvasBrasil', {static:false}) public myCanvas1:ElementRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll

  ngOnInit(){
    this.getDados();
    this.getMortesTotal();
    this.getMortesPaises();      
    this.getDadosFio();
  }
  

  ionViewDidEnter(){
    this.presentLoading();
    
  }

   public montaGrafico(){
    
    
     let labels = new Array<string>();
     let data= new Array<number>();
    for(let i=0;i<this.detalhes_dia.length;i++){
        data[i] = parseInt(this.detalhes_dia[i].deaths);
        labels[i] = this.detalhes_dia[i].state;
    }
    this.LineChart = new Chart(this.myCanvas.nativeElement, {
      type: 'line',
    data: {
     labels,
     datasets: [{
         label: 'Numero de óbitos até o momento.',
         data,
         backgroundColor:'#2eacb8',
         fill:true,
         lineTension:0.8,
         borderColor:"#161717",
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Obitos por estado",
         display:true
     }
    }
    });
   } 

   public montaGraficoBrasil(){
    let labels = new Array<any>();
    let data= new Array<number>();
    let mes:string="";
    let mes_in:string="02";
    let mes_fin:string="";
    let aux:number=0;
    let j:number= 0;
    let total:number=0;

   for(let i=0;i<this.detalhes_dia_fio.length;i++){
       // mes = this.detalhes_dia_fio[i].date.substring(5,7);
      if(mes_in == this.detalhes_dia_fio[i].date.substring(5,7)){
        console.log("está passando dentro do if", i);
        aux += this.detalhes_dia_fio[i].new_deaths;
        console.log("está passando dentro do if-aux", aux);
      }
      else if(mes_in != this.detalhes_dia_fio[i].date.substring(5,7)){
        console.log(mes_in);
        console.log("dentro do else", j);
        console.log(this.detalhes_dia_fio[i].date.substring(5,7));
        mes_in = this.detalhes_dia_fio[i].date.substring(5,7);
        j++;
        data[j] =aux;
        aux=0;
      }
      if(i==this.detalhes_dia_fio.length-1){
        data[j+1]=aux;
        console.log("final da execução, mes 6");
      }
      total +=aux; 
   }
   for(let i=0; i <data.length;i++){
     console.log(data[i]);
   }
   console.log(total);
   console.log("janeiro",data[1],"/fevereiro:", data[2],"/ março: ",data[3], "atual",data[data.length-1] )
   this.LineChart = new Chart(this.myCanvas1.nativeElement, {
     type: 'bar',
   data: {
    labels:['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
        label:['Mortes por mês'],
        data,
         backgroundColor:['#2eacb8','#e3ac14','#4ba60a','#0aa699', '#0a48a6', '#650aa6','#85037e'],
         fill:true,
         lineTension:0.6,
         borderColor:"#161717",
         borderWidth: 1,
     }]
   }, 
   options: {
    title:{
        text:"De janeiro até o mes atual"
    }
   }
   });
  } 
  public getDados(){
    
    this.covidService.getDadosCovid().subscribe(
      dados => {
          const response = (dados as any);
          this.detalhes_dia = this.detalhes_dia.concat(response.data);
          this.teste = this.detalhes_dia
   

      },
      erro => {
        console.log(erro);
      }
    );
      
   }   

   public getMortesMes(){

    for(let i=0;i<this.detalhes_dia.length;i++){
        if( this.detalhes_dia[i].state == this.select ){
            this.casos_sel_dia  = this.detalhes_dia[i].cases;
            this.mortes_sel_dia = this.detalhes_dia[i].deaths;
            this.dia_recente    = this.detalhes_dia[i].datetime;
        }
    }

   }

   public getMortesTotal(){
     
    this.covidService.getDadosCovidBrasil().subscribe(
      dados => {
          const response = (dados as any);
          this.detalhes_brasil = this.detalhes_brasil.concat(response.data)
          this.paises_morte    = this.detalhes_brasil[0].deaths;
          this.paises_confir   = this.detalhes_brasil[0].confirmed;
          this.paises_updat    = this.detalhes_brasil[0].updated_at;
          this.paises_recov    = this.detalhes_brasil[0].recovered;
          this.paises_casos    = this.detalhes_brasil[0].cases;
  

      },
      erro => {
        console.log(erro);
      }
    );
    
    
   }

   public getMortesPaises(){
     
    this.covidService.getDadosPaises().subscribe(
      dados => {
          const response = (dados as any);
          this.detalhes_paises = this.detalhes_paises.concat(response.data);
          
      },
      erro => {
        console.log(erro);
      }
    );
    
    
   }
   public getMortesPaiseSel(){

    for(let i=0;i<this.detalhes_paises.length;i++){
        if( this.detalhes_paises[i].country == this.select_paises ){
           this.paises_morte = this.detalhes_paises[i].deaths;
           this.paises_casos =this.detalhes_paises[i].cases;
           this.paises_confir=this.detalhes_paises[i].confirmed;
           this.paises_recov =this.detalhes_paises[i].recovered;
           this.paises_updat =this.detalhes_paises[i].updated_at;
           this.paises_country =this.detalhes_paises[i].country;
          }
    }
  
   }

   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguardando dados...',
      duration: 1700
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  efeitoScrollInfinito(event){
   setTimeout(()=>{
      event.target.complete();
     
  }, 1000)
    
  }

  public getDadosFio(){
    
    this.covidService.getDadosCovidFioCruz().subscribe(
      dados => {
          const response = (dados as any);
          this.detalhes_dia_fio = this.detalhes_dia_fio.concat(response.detalhes_por_dia);
          console.log(this.detalhes_dia_fio)

      },
      erro => {
        console.log(erro);
      }
    );
      
   } 

}
