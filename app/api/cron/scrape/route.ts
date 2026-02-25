import { NextResponse } from 'next/server';
import { initDb } from '@/lib/db';
import { scrapeAndSave } from '@/lib/scraper';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    await initDb();
    const result = await scrapeAndSave();
    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Scrape cron error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
