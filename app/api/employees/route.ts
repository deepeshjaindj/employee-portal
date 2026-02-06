import { NextRequest, NextResponse } from 'next/server';
import { getEmployees } from '@/lib/services/employees';

/**
 * GET /api/employees
 * Fetch all employees with optional status filter
 * Query params: status (Active, Inactive)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'Active' | 'Inactive' | undefined;

    const employees = await getEmployees(status);

    return NextResponse.json({
      success: true,
      data: employees,
      count: employees.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch employees',
      },
      { status: 500 }
    );
  }
}