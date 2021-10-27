import { RequiresSignedInDirective } from './requires-signed-in.directive';

describe('RequiresSignedInDirective', () => {
  it('should create an instance', () => {
    const directive = new RequiresSignedInDirective();
    expect(directive).toBeTruthy();
  });
});
