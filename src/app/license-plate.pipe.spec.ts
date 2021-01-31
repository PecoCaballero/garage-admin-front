import { LicensePlatePipe } from './license-plate.pipe';

describe('LicensePlatePipe', () => {
  it('create an instance', () => {
    const pipe = new LicensePlatePipe();
    expect(pipe).toBeTruthy();
  });
});
