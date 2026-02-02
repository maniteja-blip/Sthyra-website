$sourceDir = "assetsTOUpload"
$destDir = "optimized_videos"

# Create destination if not exists
if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

# Check for FFmpeg
try {
    $version = ffmpeg -version 2>&1
    if ($LASTEXITCODE -ne 0) { throw "FFmpeg not detected" }
    Write-Host "✅ FFmpeg detected. Starting optimization..." -ForegroundColor Green
}
catch {
    Write-Error "❌ FFmpeg is not found in this terminal. Please ensure it is installed and in your PATH."
    exit 1
}

# Get Videos
$videos = Get-ChildItem -Path $sourceDir -Filter "*.mp4"

foreach ($video in $videos) {
    $inputFile = $video.FullName
    $outputFile = Join-Path $destDir $video.Name
    
    Write-Host "🎬 Processing: $($video.Name)..." -ForegroundColor Cyan
    
    # FFmpeg Command
    # -c:v libx264 : Universal Video Codec
    # -crf 23      : Quality balance (Lower is better quality, 23 is standard for web)
    # -preset slow : Better compression efficiency
    # -movflags +faststart : Moves metadata to front for instant streaming/playback
    # -c:a aac     : Universal Audio Codec
    
    $s = Measure-Command {
        ffmpeg -i "$inputFile" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart "$outputFile" -y -hide_banner -loglevel error
    }
    
    if (Test-Path $outputFile) {
        $oldSize = (Get-Item $inputFile).Length / 1MB
        $newSize = (Get-Item $outputFile).Length / 1MB
        $savings = 100 - ($newSize / $oldSize * 100)
        
        Write-Host "✅ Done in $($s.TotalSeconds.ToString('F1'))s" -ForegroundColor Green
        Write-Host "   Size: $($oldSize.ToString('F2')) MB -> $($newSize.ToString('F2')) MB (Saved $($savings.ToString('F1'))%)" -ForegroundColor Yellow
        Write-Host "   Saved to: $outputFile`n"
    } else {
        Write-Error "❌ Failed to optimize $($video.Name)"
    }
}

Write-Host "🎉 All done! Upload the files in '$destDir' to your S3 bucket." -ForegroundColor Green
