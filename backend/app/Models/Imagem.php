<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Imagem extends Model{
    protected $table = 'imagens';

    protected $fillable = [
        'veiculo_id',
        'caminho',
        'ordem',
        'principal',
    ];

    protected function casts(): array{
        return [
            'principal' => 'boolean',
        ];
    }

    public function veiculo(): BelongsTo{
        return $this->belongsTo(Veiculo::class);
    }
}