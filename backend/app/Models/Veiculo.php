<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Veiculo extends Model{
    protected $table = 'veiculos';

    protected $fillable = [
        'marca',
        'modelo',
        'versao',
        'ano',
        'cor',
        'quilometragem',
        'combustivel',
        'cambio',
        'carroceria',
        'portas',
        'preco',
        'descricao',
        'opcionais',
        'status',
        'destaque',
        'em_oferta',
    ];

    protected function casts(): array{
        return [
            'opcionais' => 'array',
            'preco' => 'decimal:2',
            'destaque' => 'boolean',
            'em_oferta' => 'boolean',
        ];
    }

    public function imagens(): HasMany{
        return $this->hasMany(Imagem::class)->orderBy('ordem');
    }

    public function imagemPrincipal(): HasOne{
        return $this->hasOne(Imagem::class)->where('principal', true);
    }
}