import Airtable from 'airtable';

// Validate environment variables
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined in environment variables');
}

// Initialize Airtable
const airtable = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID);

// Export table references
export const tables = {
  employees: base('Employees'),
  projects: base('Projects'),
  timeEntries: base('Time Entries'),
  leaveRequests: base('Leave Requests'),
} as const;

export default base;