// Base domain types used by the app (decoupled from Airtable field names)
export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  manager?: string[];
  startDate?: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  hourThisMonth?: number;
  projectMembers?: string[];
  timeEntries?: string[];
  totalHoursLogged?: number;
  status?: string[];
}

export interface TimeEntry {
  id: string;
  date: string;
  hours: number;
  description: string;
  employeeId: string;
  projectId: string;
  projectName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaveRequest {
  id: string;
  employee: string;
  leaveType: 'Sick' | 'Casual';
  startDate: string;
  endDate: string;
  daysCount?: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
  requestedOn?: string;
}

// Form / input types (for creating/updating records)
export interface CreateTimeEntryInput {
  employeeId: string;
  projectId: string;
  date: string;
  hours: number;
  description?: string;
}

export type UpdateTimeEntryInput = Partial<CreateTimeEntryInput>;

export type CreateLeaveRequestInput = Omit<LeaveRequest, 'id' | 'daysCount' | 'requestedOn'>;