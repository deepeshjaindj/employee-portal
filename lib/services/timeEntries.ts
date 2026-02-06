import { tables } from '@/lib/airtable';
import { TimeEntry, CreateTimeEntryInput, UpdateTimeEntryInput } from '@/types';

type AirtableTimeEntryFields = {
  Description?: string;
  Date?: string;
  Hours?: number;
  Employee?: string[];
  Project?: string[];
  Status?: string;
  'Name (from Project)'?: string;
  'Created At'?: string;
  'Last Modified'?: string;
};

function airtableRecordToTimeEntry(record: any): TimeEntry {
  const fields = record.fields as AirtableTimeEntryFields;

  return {
    id: record.id,
    date: fields.Date ?? '',
    hours: fields.Hours ?? 0,
    description: fields.Description ?? '',
    employeeId: fields.Employee?.[0] ?? '',
    projectId: fields.Project?.[0] ?? '',
    projectName: fields['Name (from Project)'],
    createdAt: fields['Created At'],
    updatedAt: fields['Last Modified'],
  };
}

/**
 * Fetch time entries with optional filters
 */
export async function getTimeEntries(
  employeeId?: string,
  startDate?: string,
  endDate?: string
): Promise<TimeEntry[]> {
  try {
    const selectOptions: any = {
      sort: [{ field: 'Date', direction: 'desc' }],
    };
    const records = await tables.timeEntries.select(selectOptions).all();
    let entries = records.map((record) => airtableRecordToTimeEntry(record));

    // Filter by employee in application code rather than Airtable formula
    if (employeeId) {
      entries = entries.filter((entry) => entry.employeeId === employeeId);
    }

    // Optional date filtering (dates are in YYYY-MM-DD so string compare is fine)
    if (startDate) {
      entries = entries.filter((entry) => entry.date >= startDate);
    }
    if (endDate) {
      entries = entries.filter((entry) => entry.date <= endDate);
    }

    return entries;
  } catch (error) {
    console.error('Error fetching time entries:', error);
    throw new Error('Failed to fetch time entries');
  }
}

/**
 * Get a single time entry by ID
 */
export async function getTimeEntryById(id: string): Promise<TimeEntry> {
  try {
    const record = await tables.timeEntries.find(id);
    return airtableRecordToTimeEntry(record);
  } catch (error) {
    console.error('Error fetching time entry:', error);
    throw new Error('Failed to fetch time entry');
  }
}

/**
 * Create a new time entry
 */
export async function createTimeEntry(
  data: CreateTimeEntryInput
): Promise<TimeEntry> {
  try {
    const record = await tables.timeEntries.create({
      Employee: [data.employeeId],
      Project: [data.projectId],
      Date: data.date,
      Hours: data.hours,
      Description: data.description || '',
    });

    return airtableRecordToTimeEntry(record);
  } catch (error) {
    console.error('Error creating time entry:', error);
    throw new Error('Failed to create time entry');
  }
}

/**
 * Update an existing time entry
 */
export async function updateTimeEntry(
  id: string,
  data: UpdateTimeEntryInput
): Promise<TimeEntry> {
  try {
    const updateFields: any = {};

    if (data.employeeId !== undefined) updateFields.Employee = [data.employeeId];
    if (data.projectId !== undefined) updateFields.Project = [data.projectId];
    if (data.date !== undefined) updateFields.Date = data.date;
    if (data.hours !== undefined) updateFields.Hours = data.hours;
    if (data.description !== undefined) updateFields['Task Description'] = data.description;

    const record = await tables.timeEntries.update(id, updateFields);
    return airtableRecordToTimeEntry(record);
  } catch (error) {
    console.error('Error updating time entry:', error);
    throw new Error('Failed to update time entry');
  }
}

/**
 * Delete a time entry
 */
export async function deleteTimeEntry(id: string): Promise<{ success: boolean }> {
  try {
    await tables.timeEntries.destroy(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting time entry:', error);
    throw new Error('Failed to delete time entry');
  }
}