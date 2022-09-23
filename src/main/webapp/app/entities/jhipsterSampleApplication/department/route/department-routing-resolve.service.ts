import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDepartment } from '../department.model';
import { DepartmentService } from '../service/department.service';

@Injectable({ providedIn: 'root' })
export class DepartmentRoutingResolveService implements Resolve<IDepartment | null> {
  constructor(protected service: DepartmentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartment | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((department: HttpResponse<IDepartment>) => {
          if (department.body) {
            return of(department.body);
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
