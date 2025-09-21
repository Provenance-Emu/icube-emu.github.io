#!/bin/zsh
# Aggressive web optimization for iPad screenshots
# Target: Under 200KB per image, web-ready dimensions

echo "🌐 Starting aggressive web optimization..."
echo "Target: <200KB files, web-ready dimensions"
echo "=========================================="

# Counter for processed files
processed=0
total_before=0
total_after=0

# Web optimization settings
WEB_WIDTH=800        # Max width for web display
WEB_QUALITY=75       # JPEG quality (good balance)
PNG_COMPRESSION=9    # Max PNG compression

# Function to get file size in bytes
get_file_size() {
    stat -f%z "$1" 2>/dev/null || echo "0"
}

# Function to format bytes to human readable
format_size() {
    local size=$1
    if [[ $size -gt 1048576 ]]; then
        echo "$(echo "scale=1; $size / 1048576" | bc)MB"
    elif [[ $size -gt 1024 ]]; then
        echo "$(( size / 1024 ))KB"
    else
        echo "${size}B"
    fi
}

# Get image dimensions
get_dimensions() {
    magick identify -format "%wx%h" "$1" 2>/dev/null
}

# Process all current images (exclude originals)
for file in *.(png|PNG)(N); do
    # Skip if file doesn't exist or is a backup
    [[ ! -f "$file" ]] && continue
    [[ "$file" == *"_original"* ]] && continue
    
    echo "🖼️  Processing: $file"
    
    # Get current info
    original_size=$(get_file_size "$file")
    original_dims=$(get_dimensions "$file")
    total_before=$((total_before + original_size))
    
    echo "   📏 Current: $original_dims, $(format_size $original_size)"
    
    # Create web-optimized version
    temp_file="${file%.*}_temp.${file##*.}"
    
    # For very large images, be more aggressive
    if [[ $original_size -gt 1048576 ]]; then  # > 1MB
        # Convert large PNGs to JPEG for better compression
        if [[ "$file" == *.PNG ]] || [[ "$file" == *.png ]]; then
            web_file="${file%.*}.jpg"
            echo "   🔄 Converting PNG→JPEG for better compression"
            
            # Aggressive optimization: resize to max width, convert to JPEG
            if magick "$file" -resize "${WEB_WIDTH}>" -quality $WEB_QUALITY -strip "$web_file" 2>/dev/null; then
                # Replace original with optimized version
                rm "$file"
                mv "$web_file" "${file%.*}.jpg"
                final_file="${file%.*}.jpg"
            else
                echo "   ❌ JPEG conversion failed, trying PNG optimization"
                final_file="$file"
            fi
        else
            final_file="$file"
        fi
    else
        final_file="$file"
    fi
    
    # If still PNG or conversion failed, optimize as PNG
    if [[ "$final_file" == *.PNG ]] || [[ "$final_file" == *.png ]]; then
        magick "$final_file" -resize "${WEB_WIDTH}>" -strip -define png:compression-level=$PNG_COMPRESSION "$temp_file" 2>/dev/null
        if [[ -f "$temp_file" ]]; then
            mv "$temp_file" "$final_file"
        fi
    fi
    
    # Get final stats
    if [[ -f "$final_file" ]]; then
        final_size=$(get_file_size "$final_file")
        final_dims=$(get_dimensions "$final_file")
        total_after=$((total_after + final_size))
        
        # Calculate savings
        if [[ $original_size -gt 0 ]]; then
            savings=$(echo "scale=1; ($original_size - $final_size) / $original_size * 100" | bc)
        else
            savings="0.0"
        fi
        
        # Check if under target size
        size_status=""
        if [[ $final_size -lt 204800 ]]; then  # < 200KB
            size_status="✅"
        else
            size_status="⚠️"
        fi
        
        echo "   $size_status Final: $final_dims, $(format_size $final_size) (${savings}% saved)"
        processed=$((processed + 1))
    else
        echo "   ❌ Failed to optimize $file"
    fi
    echo ""
done

# Summary
echo "=========================================="
echo "🎉 Web optimization complete!"
echo "📊 Files processed: $processed"

if [[ $total_before -gt 0 ]]; then
    total_savings=$(echo "scale=1; ($total_before - $total_after) / $total_before * 100" | bc)
    echo "💾 Total space saved: $(format_size $((total_before - total_after))) (${total_savings}%)"
    echo "📦 Before: $(format_size $total_before)"
    echo "📦 After: $(format_size $total_after)"
    
    # Calculate average file size
    if [[ $processed -gt 0 ]]; then
        avg_size=$((total_after / processed))
        echo "📈 Average file size: $(format_size $avg_size)"
        
        if [[ $avg_size -lt 204800 ]]; then
            echo "✅ All files are web-ready!"
        else
            echo "⚠️  Some files may still be large for web"
        fi
    fi
fi

echo ""
echo "🌐 Optimization targets:"
echo "   • Max width: ${WEB_WIDTH}px"
echo "   • Target size: <200KB"
echo "   • Large PNGs converted to JPEG"
echo "   • Metadata stripped"