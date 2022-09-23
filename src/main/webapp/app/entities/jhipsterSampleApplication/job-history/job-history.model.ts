import dayjs from 'dayjs/esm';
import { IJob } from 'app/entities/jhipsterSampleApplication/job/job.model';
import { IDepartment } from 'app/entities/jhipsterSampleApplication/department/department.model';
import { IEmployee } from 'app/entities/jhipsterSampleApplication/employee/employee.model';
import { Language } from 'app/entities/enumerations/language.model';

export interface IJobHistory {
  id: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  language?: Language | null;
  job?: Pick<IJob, 'id'> | null;
  department?: Pick<IDepartment, 'id'> | null;
  employee?: Pick<IEmployee, 'id'> | null;
}

export type NewJobHistory = Omit<IJobHistory, 'id'> & { id: null };
