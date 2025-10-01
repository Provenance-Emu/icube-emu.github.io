#!/usr/bin/env node

/**
 * Pre-generate modified IPA files with unique version numbers
 * This allows static hosting (GitHub Pages) to serve IPAs with different versions
 * even if the original IPAs share the same CFBundleVersion
 */

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const bplistParser = require('bplist-parser');
const bplistCreator = require('bplist-creator');

const BUILDS_DIR = path.join(__dirname, '../public/builds');
const VERSIONED_DIR = path.join(__dirname, '../public/builds-versioned');

/**
 * Process a single IPA file and create a versioned copy
 */
function processIPA(ipaPath, customVersion, outputPath) {
  console.log(`Processing: ${path.basename(ipaPath)} -> version ${customVersion}`);
  
  try {
    // Load the IPA (it's a zip file)
    const zip = new AdmZip(ipaPath);
    const zipEntries = zip.getEntries();

    // Find the Info.plist file
    const infoPlistEntry = zipEntries.find(entry => 
      entry.entryName.match(/Payload\/[^\/]+\.app\/Info\.plist$/)
    );

    if (!infoPlistEntry) {
      console.error(`  ❌ Info.plist not found in ${path.basename(ipaPath)}`);
      return false;
    }

    // Parse the Info.plist (binary format)
    const infoPlistData = infoPlistEntry.getData();
    const parsedArray = bplistParser.parseBuffer(infoPlistData);
    const infoPlist = parsedArray[0];

    // Modify version strings
    infoPlist.CFBundleShortVersionString = customVersion;
    infoPlist.CFBundleVersion = customVersion;

    // Convert back to binary plist format
    const modifiedPlistData = bplistCreator(infoPlist);

    // Update the entry in the zip (modifiedPlistData is already a Buffer)
    zip.updateFile(infoPlistEntry.entryName, modifiedPlistData);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the modified IPA
    zip.writeZip(outputPath);
    
    console.log(`  ✅ Created: ${path.relative(VERSIONED_DIR, outputPath)}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error processing ${path.basename(ipaPath)}:`, error.message);
    return false;
  }
}

/**
 * Generate version string based on directory structure
 */
function generateVersionString(versionDir, platformDir) {
  let versionString = versionDir;
  
  // Parse platform and beta info
  const platformMatch = platformDir.match(/^(iOS|tvOS)(?:-Beta(\d+))?$/i);
  if (!platformMatch) return null;
  
  const platform = platformMatch[1];
  const betaNumber = platformMatch[2];
  
  // Add beta suffix
  if (betaNumber) {
    versionString += `-beta${betaNumber}`;
  }
  
  // Add platform suffix
  versionString += `-${platform.toLowerCase()}`;
  
  return versionString;
}

/**
 * Main function to process all IPAs
 */
function main() {
  console.log('🚀 Generating versioned IPA files...\n');
  
  if (!fs.existsSync(BUILDS_DIR)) {
    console.error(`❌ Builds directory not found: ${BUILDS_DIR}`);
    process.exit(1);
  }

  // Clean versioned directory
  if (fs.existsSync(VERSIONED_DIR)) {
    fs.rmSync(VERSIONED_DIR, { recursive: true });
  }
  fs.mkdirSync(VERSIONED_DIR, { recursive: true });

  let processedCount = 0;
  let errorCount = 0;

  // Read all version directories (e.g., 1.0.0, 1.0.1, etc.)
  const versionDirs = fs.readdirSync(BUILDS_DIR).filter(file => {
    const fullPath = path.join(BUILDS_DIR, file);
    return fs.statSync(fullPath).isDirectory() && /^\d+\.\d+\.\d+$/.test(file);
  });

  for (const versionDir of versionDirs) {
    const versionPath = path.join(BUILDS_DIR, versionDir);

    // Read platform/beta directories
    const platformDirs = fs.readdirSync(versionPath).filter(file => {
      const fullPath = path.join(versionPath, file);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const platformDir of platformDirs) {
      const platformPath = path.join(versionPath, platformDir);

      // Generate custom version string
      const customVersion = generateVersionString(versionDir, platformDir);
      if (!customVersion) {
        console.log(`⚠️  Skipping invalid platform directory: ${platformDir}`);
        continue;
      }

      // Look for IPA file
      const files = fs.readdirSync(platformPath);
      const ipaFile = files.find(f => f.endsWith('.ipa'));
      
      if (!ipaFile) {
        console.log(`⚠️  No IPA found in ${versionDir}/${platformDir}`);
        continue;
      }

      const ipaPath = path.join(platformPath, ipaFile);
      const outputPath = path.join(VERSIONED_DIR, versionDir, platformDir, ipaFile);

      // Process the IPA
      const success = processIPA(ipaPath, customVersion, outputPath);
      if (success) {
        processedCount++;
      } else {
        errorCount++;
      }
    }
  }

  console.log(`\n✨ Done!`);
  console.log(`   Processed: ${processedCount} IPAs`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }
  console.log(`   Output: ${VERSIONED_DIR}`);
}

// Run the script
main();
