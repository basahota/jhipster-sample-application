import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask } from '../task.model';
import { TaskService } from '../service/task.service';

@Injectable({ providedIn: 'root' })
export class TaskRoutingResolveService implements Resolve<ITask | null> {
  constructor(protected service: TaskService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITask | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((task: HttpResponse<ITask>) => {
          if (task.body) {
            return of(task.body);
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
