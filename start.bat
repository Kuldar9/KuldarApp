@echo off
echo ==========================================
echo    LOPUTOO PROJEKTI AUTOMATNE SETUP
echo ==========================================

echo [1/3] Installeerin Node.js moodulid...
:: 'call' on vajalik, et skript jätkaks peale npm-i lõpetamist
call npm install
if %ERRORLEVEL% neq 0 (
    echo VIGA: Node moodulite install ebaonnestus!
    pause
    exit /b %ERRORLEVEL%
)

echo [2/3] Kontrollin Pythoni virtuaalkeskkonda...
cd Server/serverBackend/microServices/imageProcessing
if not exist "python_env" (
    echo Luuakse uus python_env...
    python -m venv python_env
)

echo [3/3] Installeerin Pythoni raamatukogud...
:: Aktiveerime keskkonna ja installime requirements.txt põhjal
call python_env\Scripts\activate
pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo VIGA: Pythoni moodulite install ebaonnestus!
    pause
    exit /b %ERRORLEVEL%
)

echo ==========================================
echo    VALMIS! Kasuta 'npm run dev' et alustada.
echo ==========================================
pause