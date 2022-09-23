import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';

@Injectable({ providedIn: 'root' })
export class EmployeeRoutingResolveService implements Resolve<IEmployee | null> {
  constructor(protected service: EmployeeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployee | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employee: HttpResponse<IEmployee>) => {
          if (employee.body) {
            return of(employee.body);
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
