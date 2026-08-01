<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class VeiculoResource extends JsonResource{
    public function toArray(Request $request): array{
        return [
            'id' => $this->id,
            'marca' => $this->marca,
            'modelo' => $this->modelo,
            'versao' => $this->versao,
            'ano' => $this->ano,
            'cor' => $this->cor,
            'quilometragem' => $this->quilometragem,
            'combustivel' => $this->combustivel,
            'cambio' => $this->cambio,
            'carroceria' => $this->carroceria,
            'portas' => $this->portas,
            'preco' => $this->preco,
            'descricao' => $this->descricao,
            'opcionais' => $this->opcionais,
            'status' => $this->status,
            'destaque' => $this->destaque,
            'em_oferta' => $this->em_oferta,
            'criado_em' => $this->created_at,
            'imagens' => $this->whenLoaded('imagens', fn () => $this->imagens->map(fn ($img) => [
                'id' => $img->id,
                'url' => Storage::disk('public')->url($img->caminho),
                'principal' => $img->principal,
                'ordem' => $img->ordem,
            ])),
        ];
    }
}