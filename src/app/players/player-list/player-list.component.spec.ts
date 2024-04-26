import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlayerListComponent } from './player-list.component';
import { PLAYERS } from '../../../../server/data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;

  // this is testing utility API which will help cretae instance of component, 
  // and debugging of the component etc
  let fixture: ComponentFixture<PlayerListComponent>;

  // DebugElement is very important utility to test angular components
  // you use this one to get information of DOM
  let el: DebugElement;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      // Define the component that is being tested and other component needed
      declarations: [PlayerListComponent]

      // we should import all the module which are required to run this component
      // comnented below as we don't need any import to test this component.
      // imports: [CommonModule]
    })
      .compileComponents()
      // then block is used to resolve Promise before we move to executing tests
      .then(() => {
        fixture = TestBed.createComponent(PlayerListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the player list', () => {
    // Injecting data to html, kind of mocking
    component.playerList = PLAYERS;
    // log before detect changes, for debugging purpose, nativeElement is HTML property
    console.log(el.nativeElement.outerHTML);
    // Detect changes actualy refresh DOM and add the updated elements to DOM
    // If we dont call it here...test case will fail
    fixture.detectChanges();
    // log after detect changes
    console.log(el.nativeElement.outerHTML);
    // quering DOM by CSS
    const lists = el.queryAll(By.css(".cus-style"));
    expect(lists).toBeTruthy();
    // there are total 6 records in PLAYERS data
    expect(lists.length).toBe(6);
  });

});
