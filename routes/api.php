<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/contacts', [ContactController::class, 'getContacts']);

    Route::get('/chat/{contact}', [ChatController::class, 'getMessages']);

    Route::post('/chat/{contact}/send-message', [ChatController::class, 'sendMessage']);
});
