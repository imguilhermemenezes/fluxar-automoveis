<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VeiculoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ConfiguracaoController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ImagemController;
use App\Http\Controllers\Api\FotoLojaController;

Route::get('/configuracoes', [ConfiguracaoController::class, 'show']);
Route::put('/configuracoes', [ConfiguracaoController::class, 'update']);

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('veiculos', VeiculoController::class)->only(['index', 'show']);

Route::get('/fotos-loja', [FotoLojaController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('veiculos', VeiculoController::class)->except(['index', 'show']);
    Route::get('/dashboard', [DashboardController::class, 'resumo']);

    Route::post('/veiculos/{veiculo}/imagens', [ImagemController::class, 'store']);
    Route::patch('/imagens/{imagem}', [ImagemController::class, 'update']);
    Route::delete('/imagens/{imagem}', [ImagemController::class, 'destroy']);

    Route::put('/perfil', [AuthController::class, 'atualizarPerfil']);
    Route::post('/fotos-loja', [FotoLojaController::class, 'store']);
    Route::delete('/fotos-loja/{fotoLoja}', [FotoLojaController::class, 'destroy']);
});
