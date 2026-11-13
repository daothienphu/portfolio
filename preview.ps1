$rootPath = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'dist'))
$listener = [Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8765/')
$listener.Start()
Write-Host 'Preview: http://localhost:8765/  (press Ctrl+C to stop)'
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
      $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
      if (-not $relative -or $relative.EndsWith('/')) { $relative += 'index.html' }
      $filePath = [IO.Path]::GetFullPath((Join-Path $rootPath $relative))
      if (-not $filePath.StartsWith($rootPath + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or -not [IO.File]::Exists($filePath)) { $context.Response.StatusCode = 404 }
      else {
        $types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.gif'='image/gif'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.pdf'='application/pdf'; '.mp4'='video/mp4'; '.webm'='video/webm' }
        $ext = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $context.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
        $bytes = [IO.File]::ReadAllBytes($filePath)
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch { $context.Response.StatusCode = 500 } finally { $context.Response.Close() }
  }
} finally { $listener.Stop(); $listener.Close() }
