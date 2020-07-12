import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampanhaPage } from './campanha.page';

describe('CampanhaPage', () => {
  let component: CampanhaPage;
  let fixture: ComponentFixture<CampanhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampanhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampanhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
