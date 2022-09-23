import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationRegion.home.title' },
        loadChildren: () => import('./jhipsterSampleApplication/region/region.module').then(m => m.JhipsterSampleApplicationRegionModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationCountry.home.title' },
        loadChildren: () =>
          import('./jhipsterSampleApplication/country/country.module').then(m => m.JhipsterSampleApplicationCountryModule),
      },
      {
        path: 'location',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationLocation.home.title' },
        loadChildren: () =>
          import('./jhipsterSampleApplication/location/location.module').then(m => m.JhipsterSampleApplicationLocationModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationDepartment.home.title' },
        loadChildren: () =>
          import('./jhipsterSampleApplication/department/department.module').then(m => m.JhipsterSampleApplicationDepartmentModule),
      },
      {
        path: 'task',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationTask.home.title' },
        loadChildren: () => import('./jhipsterSampleApplication/task/task.module').then(m => m.JhipsterSampleApplicationTaskModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationEmployee.home.title' },
        loadChildren: () =>
          import('./jhipsterSampleApplication/employee/employee.module').then(m => m.JhipsterSampleApplicationEmployeeModule),
      },
      {
        path: 'job',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationJob.home.title' },
        loadChildren: () => import('./jhipsterSampleApplication/job/job.module').then(m => m.JhipsterSampleApplicationJobModule),
      },
      {
        path: 'job-history',
        data: { pageTitle: 'jhipsterSampleApplicationApp.jhipsterSampleApplicationJobHistory.home.title' },
        loadChildren: () =>
          import('./jhipsterSampleApplication/job-history/job-history.module').then(m => m.JhipsterSampleApplicationJobHistoryModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
