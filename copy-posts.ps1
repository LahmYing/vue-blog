# 复制 Markdown 文章文件
Get-ChildItem "C:\Users\Administrator\Documents\trae_projects\test\blog\source\_posts\*.md" | Copy-Item -Destination "C:\Users\Administrator\Documents\trae_projects\test\vue-blog\src\data\posts\" -Force

# 复制图片目录
Get-ChildItem "C:\Users\Administrator\Documents\trae_projects\test\blog\source\_posts\" -Directory | ForEach-Object {
    $targetDir = "C:\Users\Administrator\Documents\trae_projects\test\vue-blog\public\assets\images\" + $_.Name
    New-Item -ItemType Directory -Path $targetDir -Force
    Get-ChildItem $_.FullName -File | Copy-Item -Destination $targetDir -Force
}

Write-Host "文章和图片复制完成！"
