import { NextResponse } from 'next/server';
import path from 'path';
import { generateAltStoreApp } from '@/lib/buildParser';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * SideStore Source Feed API
 * Returns a JSON feed compatible with SideStore (same format as AltStore)
 */
export async function GET() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://icube-emu.com';
    const buildsDir = path.join(process.cwd(), 'public', 'builds');

    const app = generateAltStoreApp(baseURL, buildsDir);
    
    // Filter to iOS only to avoid duplicate version errors
    // AltStore/SideStore don't support multiple platforms per app
    app.versions = app.versions.filter(v => v.platform === 'iOS');

    const source = {
      name: 'iCube',
      identifier: 'com.joemattiello.icube.source',
      subtitle: 'GameCube & Wii Emulator',
      description: 'Official source for iCube - GameCube and Wii emulator for iOS and tvOS.',
      iconURL: `${baseURL}/icon-512.png`,
      headerURL: `${baseURL}/header.png`,
      website: 'https://icube-emu.com',
      tintColor: '#3B82F6',
      featuredApps: [app.bundleIdentifier],
      apps: [app],
      news: [
        {
          title: 'Welcome to iCube',
          identifier: 'welcome-to-icube',
          caption: 'GameCube & Wii emulation on iOS and tvOS',
          date: new Date().toISOString().split('T')[0],
          tintColor: '#3B82F6',
          imageURL: `${baseURL}/news-welcome.png`,
          notify: false,
          url: 'https://icube-emu.com',
        },
      ],
    };

    return NextResponse.json(source, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error generating SideStore source:', error);
    return NextResponse.json(
      { error: 'Failed to generate source feed' },
      { status: 500 }
    );
  }
}
