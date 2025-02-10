import { Provider } from '@angular/core';
// import { Observable, of } from 'rxjs';

import { LoaderService } from './loader.service';
// import { ExampleReturnType } from './example-return-type.model';
// import { MOCK_ExampleReturnType } from './example-return-type.model.mock';
// export const MOCK_ExampleReturnType: ExampleReturnType = {};

export const MOCK_LoaderService: LoaderService = {
  // method(): Observable<ExampleReturnType> {
  //  return of(MOCK_ExampleReturnType);
  // },
};

export const MOCK_LoaderServiceProvider: Provider = {
  provide: LoaderService,
  useValue: MOCK_LoaderService,
};
