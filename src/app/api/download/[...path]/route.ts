import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import plist from 'plist';

export const dynamic = 'force-dynamic';

/**
 * Dynamic IPA download endpoint that modifies version numbers on-the-fly
 * This allows serving multiple builds with unique version strings even if they
 * share the same CFBundleVersion in their Info.plist
 * 
 * Usage: /api/download/builds/1.0.0/iOS-Beta7/iCube.ipa?version=1.0.0-beta7-ios
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params in Next.js 15+
    const { path: pathSegments } = await params;
    const searchParams = request.nextUrl.searchParams;
    const customVersion = searchParams.get('version');

    // Reconstruct the file path
    const filePath = path.join(process.cwd(), 'public', ...pathSegments);

    // Verify file exists and is an IPA
    if (!fs.existsSync(filePath) || !filePath.endsWith('.ipa')) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // If no custom version requested, just serve the file as-is
    if (!customVersion) {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
        },
      });
    }

    // Modify the IPA with custom version
    const zip = new AdmZip(filePath);
    const zipEntries = zip.getEntries();

    // Find the Info.plist file (usually in Payload/AppName.app/Info.plist)
    const infoPlistEntry = zipEntries.find(entry => 
      entry.entryName.match(/Payload\/[^\/]+\.app\/Info\.plist$/)
    );

    if (!infoPlistEntry) {
      return NextResponse.json(
        { error: 'Info.plist not found in IPA' },
        { status: 500 }
      );
    }

    // Parse the Info.plist
    const infoPlistData = infoPlistEntry.getData();
    const infoPlist = plist.parse(infoPlistData.toString('utf8')) as {
      CFBundleShortVersionString?: string;
      CFBundleVersion?: string;
      [key: string]: unknown;
    };

    // Modify version strings
    infoPlist.CFBundleShortVersionString = customVersion;
    infoPlist.CFBundleVersion = customVersion;

    // Convert back to plist format
    // Cast to PlistObject to satisfy TypeScript (the plist library accepts this)
    const modifiedPlistData = plist.build(infoPlist as plist.PlistObject);

    // Update the entry in the zip
    zip.updateFile(infoPlistEntry.entryName, Buffer.from(modifiedPlistData, 'utf8'));

    // Generate the modified IPA
    const modifiedIpaBuffer = zip.toBuffer();

    // Return the modified IPA
    return new NextResponse(modifiedIpaBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
        'Content-Length': modifiedIpaBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error modifying IPA:', error);
    return NextResponse.json(
      { error: 'Failed to process IPA file' },
      { status: 500 }
    );
  }
}
