<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VeiculoResource;
use App\Models\Veiculo;

class DashboardController extends Controller
{
    public function resumo()
    {
        return response()->json([
            'veiculos_cadastrados' => Veiculo::count(),
            'em_destaque' => Veiculo::where('destaque', true)->count(),
            'ofertas_ativas' => Veiculo::where('em_oferta', true)->count(),
            'ultimos_veiculos' => VeiculoResource::collection(
                Veiculo::latest()->limit(5)->get()
            ),
        ]);
    }
}