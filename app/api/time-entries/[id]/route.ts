import { NextRequest, NextResponse } from 'next/server';
import {
  getTimeEntryById,
  updateTimeEntry,
  deleteTimeEntry,
} from '@/lib/services/timeEntries';

/**
 * GET /api/time-entries/[id]
 * Fetch a single time entry
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const entry = await getTimeEntryById((await params).id);

    return NextResponse.json({
      success: true,
      data: entry,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch time entry',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/time-entries/[id]
 * Update a time entry
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const entry = await updateTimeEntry((await params).id, body);

    return NextResponse.json({
      success: true,
      data: entry,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update time entry',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/time-entries/[id]
 * Delete a time entry
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await deleteTimeEntry((await params).id);

    return NextResponse.json({
      success: true,
      message: 'Time entry deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete time entry',
      },
      { status: 500 }
    );
  }
}