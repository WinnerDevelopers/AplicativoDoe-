import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage'

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

  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.id = data.id;

      if(this.id!=0){
        this.loadCampanha();
      }

    });
  }

  loadCampanha(){

    return new Promise(resolve => {
      let body = {
        aski: 'campanha_dados',
        id: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.nomeCampanha = res.result.nomeCampanha;
        this.descricaoCampanha = res.result.descricaoCampanha;
        this.inicioCampanha = res.result.inicioCampanha;
        this.fimCampanha = res.result.inicioCampanha;
        this.fotoCampanha = res.result.fotoCampanha;
        /* console.log(res); */
      });
      
    });

  }

}
