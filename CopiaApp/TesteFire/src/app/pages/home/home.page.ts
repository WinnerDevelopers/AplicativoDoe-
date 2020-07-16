import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { AcessProviders } from '../../providers/acess-providers';
import { Storage } from '@ionic/storage';
import { ModalPostagemComponent } from './../modal-postagem/modal-postagem.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage: any;
  id: number;
  nome: string;
  image: string;
  email: string;
  emailUser: string = "";
  nomeOng : string;
  senha: string;
  ongs : any = [];
  users: any = [];
  posts: any = [];
  limit : number = 13;
  start : number = 0;
  heart: string = "../assets/img/fav.png";
  foto: string = "../assets/img/fav.png";
  heart2: string = "../assets/img/fav2.png";
  click:boolean;
  totalongs: number;


  campanhas : string[] = ["Unicef","ACCD","Teleton","Cedesp"];

  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private acssPvrs: AcessProviders, private storage: Storage, public navCtrl: NavController, private modalCtrl: ModalController) { 
  }

  ngOnInit() { 
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


  ionViewDidEnter(){
    this.storage.get('store_xxx').then((res)=>{
      /* console.log(res); */
      this.datastorage = res;
  
      this.id = this.datastorage.codUsuario;
      this.email = this.datastorage.emailUsuario;
      this.senha = this.datastorage.senhaUsuario;
    /*   this.nome = this.datastorage.nomeUsuario; */
      /* this.image = this.datastorage.fotoUsuario; */
      this.LoadUser();
      this.LoadPosts();
    });
    this.start = 0;
    this.ongs = [];
    this.LoadOngs();
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: "Por favor Espere....",
    });

    loader.present();
    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  loadData(event){
    this.start += this.limit;
    setTimeout(() =>{
      this.LoadOngs().then(()=>{
          event.target.complete();
      });
    },500);
  } 

  async LoadOngs(){

    return new Promise(resolve => {
      let body = {
        aski: 'load_ongs',
        start: this.start,
        limit: this.limit,
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((data:any) =>{
        console.log(data)
        for(let datas of data.result){
          this.ongs.push(datas);
        }
        resolve(true);  
      });

    });
  }

  async LoadUser(){
    return new Promise(resolve => {
      let body = {
        aski: 'listar_user',
        id: this.id
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        console.log(res);
        this.nome = res.result.nomeUsuario;
        this.email = res.result.emailUsuario;
        this.image = res.result.fotoUsuario;
      });

    });

  }

  async LoadPosts(){
    return new Promise(resolve => {
      let body = {
        aski: 'listar_postagens'
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((data:any)=>{
        for(let datas of data.result){
          this.posts.push(datas);
        }
        resolve(true);
      });

    });

  }

  async OpenModal(a){
    const modal = await this.modalCtrl.create({
      component: ModalPostagemComponent,
      componentProps: {
        id: a
      }
    });
    
    await modal.present();
  }

  /* AddFav(user, ong){
    return new Promise(resolve => {
      let body = {
        aski: 'proses_addfavorito',
        usuario: user,
        ong: ong
      }

      this.acssPvrs.postData(body,'proses_api.php').subscribe((res:any)=>{
        if(res.sucess==true){
          console.log("Adicionado ou Deletado");
        }else{
          console.log("Nao adicionado aos favoritos");
        }
      },(err)=>{
        console.log(err);
        }

      );

    });
  } */

  async delData(){

  }

  async Logout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
    const toast = await this.toastCtrl.create({
      message: 'Logout com Sucesso',
      duration: 1500,
      position: "top"
    })
    toast.present();
  }

  OpenCrud(a){
    this.router.navigate(['/crud/'+a]);
  }

  OpenFav(){
    this.router.navigate(['/favoritos/']);
  }

  OpenCampanhas(){
    this.router.navigate(['/campanha/']);
  }

  OpenOng(id){
    this.router.navigate(['/ong/'+id]);
  }

}
