import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { JobHistoryFormService, JobHistoryFormGroup } from './job-history-form.service';
import { IJobHistory } from '../job-history.model';
import { JobHistoryService } from '../service/job-history.service';
import { IJob } from 'app/entities/jhipsterSampleApplication/job/job.model';
import { JobService } from 'app/entities/jhipsterSampleApplication/job/service/job.service';
import { IDepartment } from 'app/entities/jhipsterSampleApplication/department/department.model';
import { DepartmentService } from 'app/entities/jhipsterSampleApplication/department/service/department.service';
import { IEmployee } from 'app/entities/jhipsterSampleApplication/employee/employee.model';
import { EmployeeService } from 'app/entities/jhipsterSampleApplication/employee/service/employee.service';
import { Language } from 'app/entities/enumerations/language.model';

@Component({
  selector: 'jhi-job-history-update',
  templateUrl: './job-history-update.component.html',
})
export class JobHistoryUpdateComponent implements OnInit {
  isSaving = false;
  jobHistory: IJobHistory | null = null;
  languageValues = Object.keys(Language);

  jobsSharedCollection: IJob[] = [];
  departmentsSharedCollection: IDepartment[] = [];
  employeesSharedCollection: IEmployee[] = [];

  editForm: JobHistoryFormGroup = this.jobHistoryFormService.createJobHistoryFormGroup();

  constructor(
    protected jobHistoryService: JobHistoryService,
    protected jobHistoryFormService: JobHistoryFormService,
    protected jobService: JobService,
    protected departmentService: DepartmentService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareJob = (o1: IJob | null, o2: IJob | null): boolean => this.jobService.compareJob(o1, o2);

  compareDepartment = (o1: IDepartment | null, o2: IDepartment | null): boolean => this.departmentService.compareDepartment(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.jobHistory = jobHistory;
      if (jobHistory) {
        this.updateForm(jobHistory);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.jobHistoryFormService.getJobHistory(this.editForm);
    if (jobHistory.id !== null) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(jobHistory: IJobHistory): void {
    this.jobHistory = jobHistory;
    this.jobHistoryFormService.resetForm(this.editForm, jobHistory);

    this.jobsSharedCollection = this.jobService.addJobToCollectionIfMissing<IJob>(this.jobsSharedCollection, jobHistory.job);
    this.departmentsSharedCollection = this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(
      this.departmentsSharedCollection,
      jobHistory.department
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      jobHistory.employee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query()
      .pipe(map((res: HttpResponse<IJob[]>) => res.body ?? []))
      .pipe(map((jobs: IJob[]) => this.jobService.addJobToCollectionIfMissing<IJob>(jobs, this.jobHistory?.job)))
      .subscribe((jobs: IJob[]) => (this.jobsSharedCollection = jobs));

    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartment[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartment[]) =>
          this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(departments, this.jobHistory?.department)
        )
      )
      .subscribe((departments: IDepartment[]) => (this.departmentsSharedCollection = departments));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.jobHistory?.employee)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }
}
