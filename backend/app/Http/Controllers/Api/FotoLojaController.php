<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FotoLoja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoLojaController extends Controller
{
    /**
     * Público — a página Sobre precisa disso pra montar a galeria da loja.
     */
    public function index()
    {
        return response()->json(
            FotoLoja::orderBy('ordem')->get()->map(fn ($foto) => [
                'id' => $foto->id,
                'url' => Storage::disk('public')->url($foto->caminho),
                'ordem' => $foto->ordem,
            ])
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'imagens' => 'required|array',
            'imagens.*' => 'image|max:5120',
        ]);

        $ultimaOrdem = FotoLoja::max('ordem') ?? -1;

        $criadas = [];
        foreach ($request->file('imagens') as $i => $arquivo) {
            $caminho = $arquivo->store('loja', 'public');

            $criadas[] = FotoLoja::create([
                'caminho' => $caminho,
                'ordem' => $ultimaOrdem + $i + 1,
            ]);
        }

        return response()->json($criadas, 201);
    }

    public function destroy(FotoLoja $fotoLoja)
    {
        Storage::disk('public')->delete($fotoLoja->caminho);
        $fotoLoja->delete();

        return response()->json(null, 204);
    }
}