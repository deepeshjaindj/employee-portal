import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/services/projects';

/**
 * GET /api/projects
 * Fetch all projects with optional status filter
 * Query params: status (Active, On Hold, Completed)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'Active' | 'On Hold' | 'Completed' | undefined;

    const projects = await getProjects(status);

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}