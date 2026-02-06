import { tables } from '@/lib/airtable';
import { Project } from '@/types';

type AirtableProjectFields = {
  Name?: string;
  Description?: string;
  "End Date"?: string;
  "Hour This Month"?: number;
  "Project Code"?: string;
  "Project Members"?: string[];
  'Start Date'?: string;
  'Status'?: string[];
  'Time Entries'?: string[];
  'Total Hours Logged'?: number;
};

function airtableRecordToProject(record: any): Project {
  const fields = record.fields as AirtableProjectFields;

  return {
    id: record.id,
    name: fields.Name ?? '',
    description: fields.Description ?? '',
    endDate: fields['End Date'] ?? '',
    hourThisMonth: fields['Hour This Month'] ?? 0,
    startDate: fields['Start Date'] ?? '',
    code: fields['Project Code'] ?? '',
    projectMembers: fields['Project Members'] ?? [],
    timeEntries: fields['Time Entries'] ?? [],
    totalHoursLogged: fields['Total Hours Logged'] ?? 0,
    status: fields['Status'] ?? [],
  };
}

/**
 * Fetch all projects, optionally filtered by status
 */
export async function getProjects(status?: 'Active' | 'On Hold' | 'Completed'): Promise<Project[]> {
  try {
    const selectOptions: any = {
      // Sort by the primary field in Airtable (assumed to be "Name")
      sort: [{ field: 'Name', direction: 'asc' }],
    };

    if (status) {
      selectOptions.filterByFormula = `{Status} = '${status}'`;
    }

    const records = await tables.projects
      .select(selectOptions)
      .all();

    return records.map(record => airtableRecordToProject(record));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  try {
    const record = await tables.projects.find(id);
    return airtableRecordToProject(record);
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
}