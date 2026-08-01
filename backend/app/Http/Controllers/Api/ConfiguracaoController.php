<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configuracao;
use Illuminate\Http\Request;

class ConfiguracaoController extends Controller
{

    public function show()
    {
        return response()->json(
            Configuracao::first() ?? ['whatsapp_numero' => null]
        );
    }

    public function update(Request $request)
    {
        $dados = $request->validate([
            'whatsapp_numero' => 'required|string|max:20',
        ]);

        $config = Configuracao::first();
        $config->update($dados);

        return response()->json($config);
    }
}