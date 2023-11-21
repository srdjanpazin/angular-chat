<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function getContacts() {

        $contacts = Auth::user()->contacts;
        return response()->json(['contacts', $contacts]);
    }
}
