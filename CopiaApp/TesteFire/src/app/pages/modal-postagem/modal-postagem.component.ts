import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-modal-postagem',
  templateUrl: './modal-postagem.component.html',
  styleUrls: ['./modal-postagem.component.scss'],
})
export class ModalPostagemComponent {

  @Input() id: number;
  fotoOng: string = "";
  descPostagem: string = "";
  nomeOng: string = "";

  constructor(private modalCtrl: ModalController,private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute) { }

  ionViewDidEnter(){
    if(this.id!=0){
      this.loadPost();
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loadPost(){

    return new Promise(resolve => {
      let body = {
        aski: 'listar_postagem',
        idOng: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.descPostagem = res.result.descPostagem;
        this.fotoOng = res.result.fotoOng;
        this.nomeOng = res.result.nomeOng;
        //console.log(res);
      });
      
    });

  }

}
