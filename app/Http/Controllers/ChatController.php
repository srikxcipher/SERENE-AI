<?php
//app/Http/Controllers/ChatController.php
namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Services\VultrService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    protected $vultrService;

    public function __construct(VultrService $vultrService)
    {
        $this->vultrService = $vultrService;
    }

    public function index()
    {
        $messages = ChatMessage::orderBy('created_at', 'asc')->get();
        return view('chat.index', compact('messages'));
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        // Save user message
        ChatMessage::create([
            'message' => $request->message,
            'type' => 'user'
        ]);

        // Get response from Vultr Vector Store
        $response = $this->vultrService->search($request->message);

        // Process the response
        $botResponse = 'I apologize, I could not find a relevant answer.';
        
        if (isset($response['items']) && !empty($response['items'])) {
            $botResponse = $response['items'][0]['content'];
        }

        // Save bot response
        $botMessage = ChatMessage::create([
            'message' => $botResponse,
            'type' => 'bot'
        ]);

        return response()->json([
            'message' => $botMessage->message,
            'created_at' => $botMessage->created_at->format('Y-m-d H:i:s')
        ]);
    }

    public function train(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'description' => 'required|string'
        ]);

        $response = $this->vultrService->addItem(
            $request->content,
            $request->description
        );

        return response()->json([
            'success' => true,
            'message' => 'Training data added successfully'
        ]);
    }
}