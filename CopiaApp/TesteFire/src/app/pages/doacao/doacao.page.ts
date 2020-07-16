import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController,ActionSheetController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.page.html',
  styleUrls: ['./doacao.page.scss'],
})
export class DoacaoPage implements OnInit {

  datastorage: any;
  id: number;
  idUsuario: string = "";
  parametro: string = "";
  idOng : string = "";
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
  idCampanha:  string = "";
  nomeCampanha: string = "";
  descricaoCampanha :string = "";
  inicioCampanha: string = "";
  fimCampanha: string = "";
  fotoCampanha: string = "";
  cameraData: string = null;
  base64Image: string;
  descricaoDoacao: string = "";

  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController,private camera: Camera,public actionSheetController: ActionSheetController,private actRoute :ActivatedRoute) {}

  ngOnInit() {

    this.storage.get('store_xxx').then((res)=>{
      //console.log(res);
      this.datastorage = res;
      this.idUsuario = this.datastorage.codUsuario;
    });

    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.id = data.parametro;

      if(this.id!=0){
        this.loadCampanha();
      }

    });
  }

  OpenCamera(){

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }

  OpenGallery(){

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
    });

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha a Midia',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.OpenCamera();
        }
      }, {
        text: 'Abrir Galeria',
        icon: 'image',
        handler: () => {
          this.OpenGallery();
        }
      }]
    });
    await actionSheet.present();
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
        //console.log(res.idOng);
      });
      
    });

  }

  async Doar(){
    
    const alertDonation = await this.alertCtrl.create({
      cssClass: 'alert-custom',
      header: 'Realizar Doação?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            alertDonation.dismiss();
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.donationOng();
          }
        }
      ]
    });

    await alertDonation.present();

  }


  async donationOng(){

    if(this.descricaoDoacao == ""){
      this.presentToast("Insira a descricao da Doaçao!");
    }else{
      const loader = await this.loadingCtrl.create({
        message: "Por favor Espere....",
      });
      loader.present();

    return new Promise(resolve => {
      let body = {
        aski: 'realizar_doacao',
        idUsuario: this.idUsuario,
        descricaoDoacao: this.descricaoDoacao,
        idCampanha: this.idCampanha,
        fotoDoacao: this.cameraData
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        if(res.sucess==true){
          loader.dismiss();
          this.router.navigate(['/home']);
        }
        /* console.log(res); */
      });
      
    });

    }


  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: "top"
    })
    toast.present();
  }

}
