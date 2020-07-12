import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController, ModalController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { DepositModalComponent } from './../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.page.html',
  styleUrls: ['./ong.page.scss'],
})
export class OngPage implements OnInit {

  datastorage: any;
  id : number;
  nomeOng: string = "";
  descricaoOng: string = "";
  logradouroOng: string = "";
  cidadeOng: string = "";
  bairroOng: string = "";
  numeroOng: string = "";
  cepOng: string = "";
  cnpjOng: string = "";
  fotoOng:string = "";
  emailOng:string = "";
  telefoneOng:string = "";
  campanhas:any = [];


  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.id = data.id;

      if(this.id!=0){
        this.loadOng();
        this.loadCampanha();
      }

    });
  }

  slideOpts = {
    slidesPerView: 3,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  loadOng(){

    return new Promise(resolve => {
      let body = {
        aski: 'ong_apenas',
        id: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.nomeOng = res.result.nomeOng;
        this.descricaoOng = res.result.descricaoOng;
        this.logradouroOng = res.result.logradouroOng;
        this.cidadeOng = res.result.cidadeOng;
        this.bairroOng = res.result.bairroOng;
        this.numeroOng = res.result.numeroOng;
        this.cepOng = res.result.cepOng;
        this.cnpjOng = res.result.cnpjOng;
        this.fotoOng = res.result.fotoOng;
        this.emailOng = res.result.emailOng;
        this.telefoneOng = res.result.numeroFoneOng;
        /* console.log(res); */
      });
      
    });

  }

  loadCampanha(){

    return new Promise(resolve => {
      let body = {
        aski: 'campanha_ong',
        id: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((data:any)=>{
        for(let datas of data.result){
          this.campanhas.push(datas);
        }
        resolve(true); 
        /* console.log(res); */
      });

    });

  }

  OpenCampanha(a){
    this.router.navigate(['/campanha/'+a]);
  }

   async OpenModal(a){
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
      componentProps: {
        id: a
      }
    });
    
    await modal.present();
  }

}
