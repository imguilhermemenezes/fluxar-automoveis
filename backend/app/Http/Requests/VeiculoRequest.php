<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VeiculoRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Liberado por enquanto. Quando a autenticação do admin estiver
        // pronta, isso passa a checar se é um admin autenticado.
        return true;
    }

    public function rules(): array
    {
        return [
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'versao' => 'nullable|string|max:255',
            'ano' => 'required|integer|min:1950|max:' . (date('Y') + 1),
            'cor' => 'required|string|max:255',
            'quilometragem' => 'required|integer|min:0',
            'combustivel' => 'required|string|max:255',
            'cambio' => 'required|string|max:255',
            'carroceria' => 'required|string|max:255',
            'portas' => 'required|integer|min:1|max:6',
            'preco' => 'required|numeric|min:0',
            'descricao' => 'nullable|string',
            'opcionais' => 'nullable|array',
            'status' => 'nullable|in:disponivel,vendido,indisponivel',
            'destaque' => 'nullable|boolean',
            'em_oferta' => 'nullable|boolean',
        ];
    }
}