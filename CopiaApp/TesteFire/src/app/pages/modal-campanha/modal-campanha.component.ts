import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-modal-campanha',
  templateUrl: './modal-campanha.component.html',
  styleUrls: ['./modal-campanha.component.scss'],
})
export class ModalCampanhaComponent{
  @Input() id: number;
  datastorage: any;
  idCampanha:  string = "";
  nomeCampanha: string = "";
  descricaoCampanha :string = "";
  inicioCampanha: string = "";
  fimCampanha: string = "";
  fotoCampanha: string = "";
  fotoOng :string = "";
  nomeOng: string = "";
  idOng: string = "";

  constructor(private modalCtrl: ModalController,private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute) { }

  ionViewDidEnter(){
    if(this.id!=0){
      this.loadCampanha();
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loadCampanha(){

    return new Promise(resolve => {
      let body = {
        aski: 'campanha_dados',
        id: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.idCampanha = res.result.idCampanha;
        this.nomeCampanha = res.result.nomeCampanha;
        this.descricaoCampanha = res.result.descricaoCampanha;
        this.inicioCampanha = res.result.inicioCampanha;
        this.fimCampanha = res.result.inicioCampanha;
        this.fotoCampanha = res.result.fotoCampanha;
        this.fotoOng = res.result.fotoOng;
        this.nomeOng = res.result.nomeOng;
        this.idOng = res.result.idOng;
        //console.log(res);
      });
      
    });

  }


}
