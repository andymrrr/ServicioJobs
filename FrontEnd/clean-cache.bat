@echo off
echo Limpiando cache de desarrollo...

echo Terminando procesos Node.js...
taskkill /F /IM node.exe 2>nul

echo Eliminando cache de Vite...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"

echo Eliminando carpeta dist...
if exist "dist" rmdir /s /q "dist"

echo Eliminando cache de npm...
npm cache clean --force

echo Reinstalando dependencias...
npm install

echo Cache limpiado completamente.
echo Ahora puedes ejecutar: npm run dev

pause 