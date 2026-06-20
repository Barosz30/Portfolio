$port = 8081
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Portfolio -> http://localhost:$port" -ForegroundColor Cyan
Write-Host "Ctrl+C aby zatrzymać"

function Resolve-AssetPath([string]$localPath) {
  $relative = $localPath.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar
  $candidates = @(
    (Join-Path $root $relative),
    (Join-Path (Join-Path $root "public") $relative)
  )
  foreach ($candidate in $candidates) {
    if (Test-Path $candidate -PathType Leaf) { return $candidate }
  }
  return $null
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response

  $path = $request.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }
  $filePath = Resolve-AssetPath $path

  if ($filePath) {
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $ext = [IO.Path]::GetExtension($filePath).ToLower()
    $mime = switch ($ext) {
      ".html" { "text/html; charset=utf-8" }
      ".css"  { "text/css; charset=utf-8" }
      ".js"   { "application/javascript; charset=utf-8" }
      ".svg"  { "image/svg+xml" }
      ".png"  { "image/png" }
      default { "application/octet-stream" }
    }
    $response.ContentType = $mime
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $response.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $response.Close()
}
