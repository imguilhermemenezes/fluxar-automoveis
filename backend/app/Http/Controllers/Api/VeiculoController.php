<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VeiculoRequest;
use App\Http\Resources\VeiculoResource;
use App\Models\Veiculo;
use Illuminate\Http\Request;

class VeiculoController extends Controller
{
    /**
     * Lista pública da Vitrine: só mostra veículos disponíveis,
     * com busca, filtros e ordenação.
     */
    public function index(Request $request){
        $query = Veiculo::query()->with('imagens');

        if (! $request->user('sanctum')) {
            $query->where('status', 'disponivel');
        }

        $query->when($request->busca, fn ($q, $busca) => $q->where(
            fn ($q2) => $q2->where('marca', 'like', "%{$busca}%")
                ->orWhere('modelo', 'like', "%{$busca}%")
                ->orWhere('versao', 'like', "%{$busca}%")
        ));

        $query->when($request->marca, fn ($q, $v) => $q->where('marca', $v));
        $query->when($request->modelo, fn ($q, $v) => $q->where('modelo', $v));
        $query->when($request->combustivel, fn ($q, $v) => $q->whereIn('combustivel', (array) $v));
        $query->when($request->cambio, fn ($q, $v) => $q->whereIn('cambio', (array) $v));
        $query->when($request->ano_min, fn ($q, $v) => $q->where('ano', '>=', $v));
        $query->when($request->ano_max, fn ($q, $v) => $q->where('ano', '<=', $v));
        $query->when($request->preco_min, fn ($q, $v) => $q->where('preco', '>=', $v));
        $query->when($request->preco_max, fn ($q, $v) => $q->where('preco', '<=', $v));
        $query->when($request->km_max, fn ($q, $v) => $q->where('quilometragem', '<=', $v));

        match ($request->ordenar) {
            'menor_preco' => $query->orderBy('preco', 'asc'),
            'maior_preco' => $query->orderBy('preco', 'desc'),
            'menor_km' => $query->orderBy('quilometragem', 'asc'),
            default => $query->latest(),
        };

        return VeiculoResource::collection($query->paginate(12));
    }

    public function show(Veiculo $veiculo){
        return new VeiculoResource($veiculo->load('imagens'));
    }

    public function store(VeiculoRequest $request){
        $veiculo = Veiculo::create($request->validated());

        return new VeiculoResource($veiculo);
    }

    public function update(VeiculoRequest $request, Veiculo $veiculo){
        $veiculo->update($request->validated());

        return new VeiculoResource($veiculo);
    }

    public function destroy(Veiculo $veiculo)
    {
        $veiculo->delete();

        return response()->json(null, 204);
    }
}