import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppConstants } from '../constants/constants';
import { PLAYERS } from '../../../server/data';
import { HttpErrorResponse } from '@angular/common/http';

describe('PlayerService', () => {
  let service: PlayerService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlayerService
      ]
    });
    service = TestBed.inject(PlayerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all players', () => {
    // below service call is via httpClient provided by HttpClientTestingModule.
    service.getAllPlayers()
      .subscribe({
        next: payload => {
          let players: any = Object.values(payload)[0];
          expect(players).toBeTruthy();
          expect(players.length).withContext("All record not present").toBe(6);
          const player = players.find(player => player.firstName === 'Rohit');
          expect(player?.lastName).toBe('Sharma');
        }
      })
    // below is to find about the http call that we have made
    const req = httpTestingController.expectOne(`${AppConstants.apiServerUrl}/players`);
    // test type of call
    expect(req.request.method).toEqual("GET");
    // mock data for response of this call
    req.flush({ payload: PLAYERS });
  });

  it('should give an error if get all players fails', () => {
    // below service call is via httpClient provided by HttpClientTestingModule.
    service.getAllPlayers()
      .subscribe({
        next: payload => {
          // failing intentionally
          fail("get all players call should have failed");
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      })
    // below is to find about the http call that we have made, it keeps record of how may calls to this
    // particular URL has been made
    const req = httpTestingController.expectOne(`${AppConstants.apiServerUrl}/players`);
    // test type of call
    expect(req.request.method).toEqual("GET");
    // here we need to fail the request
    // 2nd argument accept why the request has failed
    req.flush('get call failed', {status: 500, statusText: 'Internal Server Error'});
  });

  afterEach(() => {
    // This basically ensure that, whatever call ( highlighted above) 
    // we have defined in httpTestingController expect part, that is called only.
    httpTestingController.verify();
  });

  afterEach(() => {
    // This basically ensure that, whatever call ( highlighted above) 
    // we have defined in httpTestingController expect part, that is called only.
    httpTestingController.verify();
  });

});
