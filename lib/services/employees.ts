import { tables } from '@/lib/airtable';
import { Employee } from '@/types';

type AirtableEmployeeFields = {
  Name?: string;
  Department?: string;
  Email?: string;
  "Employee ID"?: string;
  Manager: string[];
  "Start Date": string;
};

function airtableRecordToEmployee(record: any): Employee {
  const fields = record.fields as AirtableEmployeeFields;

  return {
    id: record.id,
    name: fields.Name ?? '',
    department: fields.Department ?? '',
    email: fields.Email ?? '',
    employeeId: fields["Employee ID"] ?? '',
    manager: fields.Manager ?? '',
    startDate: fields["Start Date"] ?? '',
  };
}


/**
 * Fetch all employees, optionally filtered by status
 */
export async function getEmployees(status?: 'Active' | 'Inactive'): Promise<Employee[]> {
  try {
    const selectOptions: any = {
      sort: [{ field: 'Name', direction: 'asc' }],
    };

    const records = await tables.employees.select(selectOptions).all();

    // For now, return all employees and ignore the optional status filter at the Airtable level.
    // This avoids coupling to a specific "Status" field name in your base schema.
    return records.map((record) => airtableRecordToEmployee(record));
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error('Failed to fetch employees');
  }
}

/**
 * Get a single employee by ID
 */
export async function getEmployeeById(id: string): Promise<Employee> {
  try {
    const record = await tables.employees.find(id);
    return airtableRecordToEmployee(record);
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw new Error('Failed to fetch employee');
  }
}

/**
 * Get employee by email (for authentication)
 */
export async function getEmployeeByEmail(email: string): Promise<Employee | null> {
  try {
    const records = await tables.employees
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;
    return airtableRecordToEmployee(records[0]);
  } catch (error) {
    console.error('Error fetching employee by email:', error);
    throw new Error('Failed to fetch employee');
  }
}

/**
 * Create or update an employee record from auth information.
 * - If an employee with the given email exists, returns it (optionally updating the name).
 * - If not, creates a minimal "Active" employee record.
 */
export async function upsertEmployeeFromAuth(params: {
  email: string;
  name?: string | null;
}): Promise<Employee> {
  const { email, name } = params;

  if (!email) {
    throw new Error('Email is required to upsert employee');
  }

  // Try to find existing employee by email
  const existing = await getEmployeeByEmail(email);

  try {
    if (existing) {
      // Optionally keep the name in sync if it changed
      // existing is already mapped to Employee domain type, so use .name (lowercase)
      const currentName = existing.name;
      if (name && name !== currentName) {
        const updated = await tables.employees.update(existing.id, {
          Name: name,
        });
        return airtableRecordToEmployee(updated);
      }

      return existing;
    }

    // Create a new minimal employee record
    // Note: Remove 'Status' field if it doesn't exist in your Airtable Employees table
    const createFields: any = {
      Name: name || email.split('@')[0],
      Email: email,
    };
    
    // Only add Status if the field exists in your Airtable schema
    // Uncomment the line below if you have a Status field:
    // createFields.Status = 'Active';

    const created = await tables.employees.create(createFields);

    return airtableRecordToEmployee(created);
  } catch (error) {
    console.error('Error upserting employee from auth:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to sync employee from auth');
  }
}