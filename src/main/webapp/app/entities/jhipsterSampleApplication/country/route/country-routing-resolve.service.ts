import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICountry } from '../country.model';
import { CountryService } from '../service/country.service';

@Injectable({ providedIn: 'root' })
export class CountryRoutingResolveService implements Resolve<ICountry | null> {
  constructor(protected service: CountryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountry | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((country: HttpResponse<ICountry>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
