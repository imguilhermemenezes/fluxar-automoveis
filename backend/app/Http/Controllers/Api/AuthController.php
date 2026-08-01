<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json(null, 204);
    }

    public function me(Request $request){
        return response()->json($request->user());
    }

    public function atualizarPerfil(Request $request){
        $user = $request->user();

        $dados = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'senha_atual' => 'nullable|string',
            'nova_senha' => 'nullable|string|min:6|confirmed',
        ]);

        $mudouEmail = $dados['email'] !== $user->email;
        $mudouSenha = ! empty($dados['nova_senha']);

        if ($mudouEmail || $mudouSenha) {
            if (! Hash::check($dados['senha_atual'] ?? '', $user->password)) {
                return response()->json(['message' => 'Senha atual incorreta.'], 422);
            }
        }

        $user->name = $dados['name'];
        $user->email = $dados['email'];

        if ($mudouSenha) {
            $user->password = Hash::make($dados['nova_senha']);
        }

        $user->save();

        return response()->json($user);
    }
}