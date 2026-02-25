import { NextResponse } from 'next/server';
import { initDb } from '@/lib/db';
import { fetchAndSaveRss } from '@/lib/rss';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  // Allow from Vercel cron or direct access (admin can trigger manually)
  try {
    await initDb();
    const result = await fetchAndSaveRss();
    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RSS cron error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
