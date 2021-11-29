<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\FolderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/folders', [FolderController::class,'index']); //muestra todos los registros
Route::post('/folders', [FolderController::class,'store']); // crea un registro
Route::delete('/folders/{id}', [FolderController::class,'destroy']); //elimina un registro

Route::get('/folders/{id}/items', [FolderController::class,'getItems']); //devuelve todos los items de folder

Route::get('/items', [ItemController::class,'index']); //muestra todos los registros
Route::post('/items', [ItemController::class,'store']); // crea un registro
Route::put('/items/{id}', [ItemController::class,'update']); // actualiza un registro
Route::delete('/items/{id}', [ItemController::class,'destroy']); //elimina un registro