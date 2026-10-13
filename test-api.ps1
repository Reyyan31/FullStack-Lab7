# test-api.ps1 - Automated API Testing for Student and Books APIs

function Invoke-ApiTest {
    param (
        [string]$Title,
        [string]$Method,
        [string]$Url,
        [string]$Body = $null
    )

    Write-Host "`n----------------------------------------" -ForegroundColor Cyan
    Write-Host "Test: $Title" -ForegroundColor Yellow
    Write-Host "$Method $Url" -ForegroundColor White
    if ($Body) {
        Write-Host "Request Body: $Body" -ForegroundColor DarkGray
    }

    try {
        $headers = @{ "Content-Type" = "application/json" }
        if ($Body) {
            $resp = Invoke-WebRequest -Uri $Url -Method $Method -Body $Body -Headers $headers -UseBasicParsing -ErrorAction Stop
        } else {
            $resp = Invoke-WebRequest -Uri $Url -Method $Method -UseBasicParsing -ErrorAction Stop
        }
        Write-Host "Status Code: $($resp.StatusCode)" -ForegroundColor Green
        Write-Host "Response Body: $($resp.Content)" -ForegroundColor Green
    }
    catch {
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $respBody = $reader.ReadToEnd()
            Write-Host "Status Code: $statusCode" -ForegroundColor Yellow
            Write-Host "Response Body: $respBody" -ForegroundColor Yellow
        } else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "   TESTING STUDENT API (PORT 3000)" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# Student API Tests
Invoke-ApiTest -Title "1. GET all students" -Method "GET" -Url "http://localhost:3000/students"
Invoke-ApiTest -Title "2. GET student with id 1" -Method "GET" -Url "http://localhost:3000/students/1"
Invoke-ApiTest -Title "3. GET student with id 99 (Not Found)" -Method "GET" -Url "http://localhost:3000/students/99"
Invoke-ApiTest -Title "4. GET students by department BSCS" -Method "GET" -Url "http://localhost:3000/students/department/BSCS"
Invoke-ApiTest -Title "5. GET students by department BSIT (case-insensitive bsit)" -Method "GET" -Url "http://localhost:3000/students/department/bsit"
Invoke-ApiTest -Title "6. POST create valid student" -Method "POST" -Url "http://localhost:3000/students" -Body '{"name":"Fatima","department":"BSSE"}'
Invoke-ApiTest -Title "7. POST create invalid student (missing dept)" -Method "POST" -Url "http://localhost:3000/students" -Body '{"name":"Incomplete"}'
Invoke-ApiTest -Title "8. PUT update student 1" -Method "PUT" -Url "http://localhost:3000/students/1" -Body '{"name":"Ali Khan","department":"BSCS"}'
Invoke-ApiTest -Title "9. PUT update student 1 with invalid data" -Method "PUT" -Url "http://localhost:3000/students/1" -Body '{"name":"","department":"BSCS"}'
Invoke-ApiTest -Title "10. PUT update non-existent student 99" -Method "PUT" -Url "http://localhost:3000/students/99" -Body '{"name":"Ghost","department":"BSCS"}'
Invoke-ApiTest -Title "11. DELETE student 2" -Method "DELETE" -Url "http://localhost:3000/students/2"
Invoke-ApiTest -Title "12. DELETE student 2 again (already deleted)" -Method "DELETE" -Url "http://localhost:3000/students/2"

Write-Host "`n==========================================" -ForegroundColor Magenta
Write-Host "   TESTING BOOKS API (PORT 3001)" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# Books API Tests
Invoke-ApiTest -Title "1. GET all books" -Method "GET" -Url "http://localhost:3001/books"
Invoke-ApiTest -Title "2. GET book with id 1" -Method "GET" -Url "http://localhost:3001/books/1"
Invoke-ApiTest -Title "3. GET book with id 999 (Not Found)" -Method "GET" -Url "http://localhost:3001/books/999"
Invoke-ApiTest -Title "4. POST create valid book" -Method "POST" -Url "http://localhost:3001/books" -Body '{"title":"Design Patterns","author":"Erich Gamma","price":3500}'
Invoke-ApiTest -Title "5. POST create invalid book (negative price)" -Method "POST" -Url "http://localhost:3001/books" -Body '{"title":"Bad Book","author":"Nobody","price":-50}'
Invoke-ApiTest -Title "6. PUT update book 2" -Method "PUT" -Url "http://localhost:3001/books/2" -Body '{"title":"Clean Code 2nd Ed","author":"Robert C. Martin","price":3200}'
Invoke-ApiTest -Title "7. PUT update non-existent book 999" -Method "PUT" -Url "http://localhost:3001/books/999" -Body '{"title":"Non-existent","author":"Nobody","price":100}'
Invoke-ApiTest -Title "8. DELETE book 3" -Method "DELETE" -Url "http://localhost:3001/books/3"
Invoke-ApiTest -Title "9. DELETE book 3 again (already deleted)" -Method "DELETE" -Url "http://localhost:3001/books/3"

Write-Host "`n==========================================" -ForegroundColor Magenta
Write-Host "   ALL TESTS COMPLETED" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta
