#!/usr/bin/env node

/**
 * Copy builds directory to the out directory after Next.js export
 * This ensures IPA files are accessible for AltStore/SideStore downloads
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'builds');
const targetDir = path.join(__dirname, '..', 'out', 'builds');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(sourceDir)) {
  console.log('📦 Copying builds directory to out/builds...');
  copyRecursiveSync(sourceDir, targetDir);
  console.log('✅ Builds copied successfully!');
  
  // Log the size of copied files
  const getDirectorySize = (dirPath) => {
    let size = 0;
    const files = fs.readdirSync(dirPath);
    
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    });
    
    return size;
  };
  
  const totalSize = getDirectorySize(targetDir);
  const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`📊 Total size: ${sizeMB} MB`);
} else {
  console.warn('⚠️  Warning: builds directory not found. Skipping copy.');
}
