import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegion } from '../region.model';
import { RegionService } from '../service/region.service';

@Injectable({ providedIn: 'root' })
export class RegionRoutingResolveService implements Resolve<IRegion | null> {
  constructor(protected service: RegionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((region: HttpResponse<IRegion>) => {
          if (region.body) {
            return of(region.body);
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
