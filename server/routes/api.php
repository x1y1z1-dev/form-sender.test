<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::post('/submit-form', [FormController::class, 'submit']);
