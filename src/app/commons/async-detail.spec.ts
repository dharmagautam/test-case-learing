import { fakeAsync, tick, flush } from "@angular/core/testing";

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
    it('Async test with setTimeout - fakeAsync()', fakeAsync( () => {
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

    it('Async test with setTimeout - fakeAsync() using flush', fakeAsync( () => {
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
});