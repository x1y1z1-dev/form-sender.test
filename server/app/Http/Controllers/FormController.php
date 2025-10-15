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

        $to = env('MAIL_TO_ADDRESS');
        $subject = env('MAIL_TO_SUBJECT');

        Mail::raw(
            "Ім’я: {$data['name']}\nEmail: {$data['email']}\nПовідомлення: {$data['message']}",
            function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
            }
        );

        return response()->json(['status' => 'success']);
    }
}
