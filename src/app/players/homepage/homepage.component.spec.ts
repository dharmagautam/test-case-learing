import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PLAYERS_PAYLOAD_MI_ONLY, PLAYERS_PAYLOAD_MI_AND_CSK, PLAYERS_PAYLOAD } from '../../../../server/data';
import { PlayerService } from '../../service/player.service';
import { PlayerListComponent } from '../player-list/player-list.component';
import { HomepageComponent } from './homepage.component';
import { click } from '../../commons/test-util';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let playerServiceSpy = jasmine.createSpyObj('PlayerService', ["getAllPlayers"]);
  let el: DebugElement;
  // declaring this with any type as data type returned by inject is of 'any'
  let playerService: any;

  // enclose body in waitForAsync
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // Add list of all component required for this container components
      declarations: [
        HomepageComponent,
        PlayerListComponent
      ],
      // bring all module which are required for this component
      imports: [
        BrowserModule,
        MatTabsModule,
        // use below instead of BrowserAnimationsModule, as we don't need any animation
        NoopAnimationsModule,
        MatCardModule
      ],
      // mention all the servier needed in this component
      providers: [
        { provide: PlayerService, useValue: playerServiceSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        // injecting player service here
        playerService = TestBed.inject(PlayerService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispay only MI tab', () => {
    // this is the mocking part, we call getAllPlayers withough bracket, use "and" to return mock data
    // PLAYERS_PAYLOAD is data with 'payload' as key. Which is being used in our component to render data.
    // It has only data for mumbai
    // 'of' is returning Oberservable which is resolved immediately.
    playerService.getAllPlayers.and.returnValue(of(PLAYERS_PAYLOAD_MI_ONLY));
    fixture.detectChanges();

    const tabs: any = el.queryAll(By.css('.mdc-tab'));
    expect(tabs.length).toBe(1);

  })

  it('should dispay two tabs - MI and CSK', () => {
    // this is the mocking part, we call getAllPlayers withough bracket, use "and" to return mock data
    // PLAYERS_PAYLOAD is data with 'payload' as key. Which is being used in our component to render data.
    // It has both MI and CSK
    playerService.getAllPlayers.and.returnValue(of(PLAYERS_PAYLOAD_MI_AND_CSK));
    fixture.detectChanges();

    const tabs: any = el.queryAll(By.css('.mdc-tab'));
    expect(tabs.length).toBe(2);

  })

  it('should display Mumbai players list when clicked', (done: DoneFn) => {
    playerService.getAllPlayers.and.returnValue(of(PLAYERS_PAYLOAD));
    fixture.detectChanges();

    const tabs: any = el.queryAll(By.css('.mdc-tab'));
    click(tabs[1]);
    fixture.detectChanges();

    setTimeout(() => {
      const tabTitle = el.queryAll(By.css('.list-head'));
      expect(tabTitle.length).toBeGreaterThan(0);
      expect(tabTitle[1].nativeElement.textContent).toContain('Chennai');
      done();
    }, 500);
  })
});