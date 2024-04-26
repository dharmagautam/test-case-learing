import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";
import { delay, of } from "rxjs";

describe('Async Testing Details', () => {

    // not very convenient way if we have lot of async calls 
    //  when we are not sure how much time will it take to complete.
    it('Async test with Jasmine done()', (done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            test = true;
            expect(test).toBeTrue();
            done();
        }, 1000);
    })

    // first recommended approach
    // using angular fakeAsync utility.
    // angular uses concept of zones implemented by zone.js
    // Angular uses it for change detection mechenism
    it('Async test with setTimeout - fakeAsync()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
        }, 500)

        setTimeout(() => {
            test = true;
            expect(test).toBeTrue();
        }, 1000);

        // Below Tick function let us move forward by 1000 ms.
        // So now we can execute assertion inside setTimeout method sucessfully
        tick(1000);
    }));

    it('Async test with setTimeout - fakeAsync() using flush', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
        }, 500)

        setTimeout(() => {
            test = true;
            expect(test).toBeTrue();
        }, 1000);

        // Below flush will move forward time to all timeout's time
        flush();
    }));


    // below code to understand order of task execution.
    it('Async test with - plain Promise - task execution', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
            console.log('First setTimeout() callback')
        })
        setTimeout(() => {
            console.log('First setTimeout() callback')
        })

        console.log('Creating Promise')
        Promise.resolve()
            .then(() => {
                console.log('First Promise evaluated successfully');
                return Promise.resolve();
            }).then(() => {
                console.log('Second Promise evaluated successfully');
                test = true;
            });

        flush();

        console.log('Running test assertions');
        expect(test).toBeTrue();
    }));


    // See below code with Promise. Used fakeAsync here
    // notice flushMicrotasks() method.
    it('Async test with - plain Promise', fakeAsync(() => {
        let test = false;

        console.log('Creating Promise')
        Promise.resolve()
            .then(() => {
                console.log('First Promise evaluated successfully');
                return Promise.resolve();
            }).then(() => {
                console.log('Second Promise evaluated successfully');
                test = true;
            });

        flushMicrotasks()

        console.log('Running test assertions');
        expect(test).toBeTrue();
    }));


    // this test explains the difference between micro-task and task
    // See values of counter before calling flushMicrotasks and flush
    it('Async test with - Promise + setTimeout', fakeAsync(() => {
        let counter = 0;

        console.log('Creating Promise')
        Promise.resolve()
            .then(() => {
                console.log('First Promise evaluated successfully');
                counter += 10;
                setTimeout(() => {
                    counter += 1;
                }, 1000)
            });
        console.log('Running test assertions');
        expect(counter).toBe(0);

        flushMicrotasks();
        expect(counter).toBe(10);

        tick(500);
        expect(counter).toBe(10);

        tick(500);
        expect(counter).toBe(11);
    }));


    // below is observable example which is purely synchronous
    // means it get resolved immediately so test get executed
    // synchronously. This will pass
    // note, we have not used fakeAsync()
    it('Async test with - Observable', () => {
        let test = false;
        console.log('Creating Observables')
        const test$ = of(test);
        test$.subscribe(() => {
            test = true;
        });
        console.log('Running test assertions');
        expect(test).toBeTrue();
    });

    // below is observable example which is asynchronous
    // means it will not get resolved immediately
    // we are calling pipe which internally calls setTimeout
    it('Async test with - Observable', fakeAsync( () => {
        let test = false;
        console.log('Creating Observables with delay')
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() => {
            test = true;
        });

        tick(1000);
        console.log('Running test assertions');
        expect(test).toBeTrue();
    }));

});