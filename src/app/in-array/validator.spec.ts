import { FormControl } from '@angular/forms';

import { inArray } from './validator';

describe('InArray', () => {
  const error = {inArray: true};

  it('"aaa" should be in array ["aaa","bbb","ccc"]', () => {
    const control = new FormControl('aaa');
    expect(inArray(['aaa','bbb','ccc'])(control)).toBeNull();
  });

  it('"aaa" should not be in array ["bbb","ccc","ddd"]', () => {
    const control = new FormControl('aaa');
    expect(inArray(["bbb","ccc","ddd"])(control)).toEqual({inArray: true, reason: ["bbb","ccc","ddd"]});
  });
});
