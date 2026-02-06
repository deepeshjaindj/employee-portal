import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getTimeEntries, createTimeEntry } from '@/lib/services/timeEntries';

/**
 * GET /api/time-entries
 * Fetch time entries with optional filters
 * Query params: employeeId, startDate, endDate
 */
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const employeeId = (token as any)?.employeeId as string | undefined;
    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: missing employee context',
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const entries = await getTimeEntries(employeeId, startDate, endDate);

    return NextResponse.json({
      success: true,
      data: entries,
      count: entries.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch time entries',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/time-entries
 * Create a new time entry
 */
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const employeeId = (token as any)?.employeeId as string | undefined;
    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: missing employee context',
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Basic validation
    if (!body.projectId || !body.date || !body.hours) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: projectId, date, hours',
        },
        { status: 400 }
      );
    }

    const entry = await createTimeEntry({
      employeeId,
      projectId: body.projectId,
      date: body.date,
      hours: body.hours,
      description: body.description,
    });

    return NextResponse.json(
      {
        success: true,
        data: entry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create time entry',
      },
      { status: 500 }
    );
  }
}