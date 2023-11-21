<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;

class ChatController extends Controller
{
    public function getMessages(User $contact) {

        $user = Auth::user();

        $messages = Message::where(function ($query) use ($user, $contact) {
            $query->where('sender_id', $user->id)
                ->where('receiver_id', $contact->id)
                ->orWhere('sender_id', $contact->id)
                ->where('receiver_id', $user->id);
        })
        ->orderBy('created_at', 'asc')
        ->take(20)
        ->get();

        return response()->json(['messages', $messages]);
    }

    public function sendMessage(User $contact, Request $request) {

        $user = Auth::user();

        $request->validate([
            'content' => 'required|string'
        ]);

        $message = Message::create([
            'content' => $request->input('content'),
            'sender_id' => $user->id,
            'receiver_id' => $contact->id
        ]);

        Event::dispatch(new MessageSent($message));

        return response()->json(['message' => $message]);
    }
}
