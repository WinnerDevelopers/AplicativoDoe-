import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController, ModalController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { ModalCampanhaComponent } from './../modal-campanha/modal-campanha.component';


@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.page.html',
  styleUrls: ['./campanha.page.scss'],
})
export class CampanhaPage implements OnInit {

  id: number;
  datastorage: any;
  idCampanha:  string = "";
  nomeCampanha: string = "";
  descricaoCampanha :string = "";
  inicioCampanha: string = "";
  fimCampanha: string = "";
  fotoCampanha: string = "";
  campanhas: any = [];

  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.id = data.id;

      if(this.id!=0){
        this.campanhas = [];
        this.loadCampanhas();
      }

    });
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: "Por favor Espere....",
    });

    loader.present();
    this.ngOnInit();
    event.target.complete();

    loader.dismiss();
  }

  loadData(event){
    setTimeout(() =>{
      this.loadCampanhas().then(()=>{
          event.target.complete();
      });
    },500);
  } 

  loadCampanhas(){

    return new Promise(resolve => {
      let body = {
        aski: 'campanhas',
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((data:any)=>{
        for(let datas of data.result){
          this.campanhas.push(datas);
        }
        resolve(true); 
      });
      
    });

  }

  async OpenModal(a){
    const modal = await this.modalCtrl.create({
      component: ModalCampanhaComponent,
      componentProps: {
        id: a
      }
    });
    
    await modal.present();
  }

}
