import { HighLightDirective } from './high-light.directive';

describe('HighLightDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const directive = new HighLightDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
