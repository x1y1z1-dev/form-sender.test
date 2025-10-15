<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormController extends Controller
{
    public function submit(Request $request)
    {
        $data = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|email',
            'message' => 'nullable|string',
        ]);

        Mail::raw(
            "Ім’я: {$data['name']}\nEmail: {$data['email']}\nПовідомлення: {$data['message']}",
            function ($message) {
                $message->to('6weeks.13h@gmail.com')
                        ->subject('6weeks - Форма заповнена');
            }
        );

        return response()->json(['status' => 'success']);
    }
}
