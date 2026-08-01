<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoLoja extends Model
{
    protected $table = 'fotos_loja';

    protected $fillable = [
        'caminho',
        'ordem',
    ];
}