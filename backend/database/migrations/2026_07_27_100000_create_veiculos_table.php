<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('veiculos', function (Blueprint $table) {
            $table->id();
            $table->string('marca');
            $table->string('modelo');
            $table->string('versao')->nullable();
            $table->year('ano');
            $table->string('cor');
            $table->unsignedInteger('quilometragem');
            $table->string('combustivel');
            $table->string('cambio');
            $table->string('carroceria');
            $table->unsignedTinyInteger('portas');
            $table->decimal('preco', 10, 2);
            $table->text('descricao')->nullable();
            $table->json('opcionais')->nullable();
            $table->enum('status', ['disponivel', 'vendido', 'indisponivel'])->default('disponivel');
            $table->boolean('destaque')->default(false);
            $table->boolean('em_oferta')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('veiculos');
    }
};
