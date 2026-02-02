$bucket = "s3://sthyra-web/s3_bundle"
$tempDir = "fix_ws_temp"
$files = @("why_sthyra_1.png", "why_sthyra_3.png", "why_sthyra_4.png")

if (!(Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir | Out-Null }

Write-Host "🔧 Starting REPAIR for 'Why Sthyra' assets..." -ForegroundColor Cyan

foreach ($file in $files) {
    try {
        $s3Path = "$bucket/$file"
        $localPath = Join-Path $tempDir $file
        $outputName = [System.IO.Path]::GetFileNameWithoutExtension($file) + ".webp"
        $outputPath = Join-Path $tempDir $outputName
        $s3Dest = "$bucket/$outputName"
    
        Write-Host "------------------------------------------------"
        Write-Host "📄 Processing $file" -ForegroundColor Yellow
    
        # 1. Download
        Write-Host "   ⬇️ Downloading..."
        aws s3 cp "$s3Path" "$localPath"
        
        if (Test-Path $localPath) {
            # 2. Optimize
            Write-Host "   ⚙️ Converting to WebP..."
            
            $srcSize = (Get-Item $localPath).Length
            Write-Host "      Source size: $($srcSize / 1KB) KB"
    
            # SIMPLIFIED: Direct execution
            ffmpeg -i "$localPath" -c:v libwebp -q:v 80 "$outputPath" -y -hide_banner -loglevel error
    
            if (Test-Path $outputPath) {
                $newSize = (Get-Item $outputPath).Length
                $savings = 100 - ($newSize / $srcSize * 100)
                Write-Host "      WebP size: $($newSize / 1KB) KB (Saved $($savings.ToString('F1'))%)" -ForegroundColor Green
    
                # 3. Upload
                Write-Host "   ⬆️ Uploading to S3..."
                aws s3 cp "$outputPath" "$s3Dest" --acl public-read --cache-control "max-age=31536000,public"
                
                if ($LASTEXITCODE -eq 0) {
                     Write-Host "   ✅ Upload Success: $outputName" -ForegroundColor Green
                } else {
                     Write-Host "   ❌ Upload FAILED for $outputName" -ForegroundColor Red
                }
    
            } else {
                Write-Error "   ❌ FFmpeg conversion failed for $file"
            }
        } else {
            Write-Error "   ❌ Failed to download $file from S3"
        }
    } catch {
        Write-Error "Error processing $file : $_"
    }
}

Write-Host "------------------------------------------------"
Write-Host "🧹 Cleaning up..."
Remove-Item -Path $tempDir -Recurse -Force
Write-Host "✨ Done."
