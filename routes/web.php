<?php
//web.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::get('/', [ChatController::class, 'index'])->name('chat.index'); // Keep this route
// Remove the closure that returns the welcome view

Route::post('/chat/send', [ChatController::class, 'sendMessage'])->name('chat.send');
Route::post('/chat/train', [ChatController::class, 'train'])->name('chat.train');