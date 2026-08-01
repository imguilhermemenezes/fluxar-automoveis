<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Imagem;
use App\Models\Veiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagemController extends Controller
{
    /**
     * Recebe uma ou mais imagens e associa ao veículo.
     * A primeira imagem enviada vira "principal" automaticamente,
     * só se o veículo ainda não tiver nenhuma.
     */
    public function store(Request $request, Veiculo $veiculo)
    {
        $request->validate([
            'imagens' => 'required|array',
            'imagens.*' => 'image|max:5120',
        ]);

        $ultimaOrdem = $veiculo->imagens()->max('ordem') ?? -1;
        $temPrincipal = $veiculo->imagens()->where('principal', true)->exists();

        $criadas = [];
        foreach ($request->file('imagens') as $i => $arquivo) {
            $caminho = $arquivo->store('veiculos', 'public');

            $criadas[] = $veiculo->imagens()->create([
                'caminho' => $caminho,
                'ordem' => $ultimaOrdem + $i + 1,
                'principal' => ! $temPrincipal && $i === 0,
            ]);
        }

        return response()->json($criadas, 201);
    }

    /**
     * Usado pra marcar uma imagem como principal (ou ajustar a ordem).
     */
    public function update(Request $request, Imagem $imagem)
    {
        $dados = $request->validate([
            'principal' => 'sometimes|boolean',
            'ordem' => 'sometimes|integer',
        ]);

        if (! empty($dados['principal'])) {
            // só pode existir uma principal por veículo
            Imagem::where('veiculo_id', $imagem->veiculo_id)->update(['principal' => false]);
        }

        $imagem->update($dados);

        return response()->json($imagem);
    }

    public function destroy(Imagem $imagem)
    {
        Storage::disk('public')->delete($imagem->caminho);
        $imagem->delete();

        return response()->json(null, 204);
    }
}