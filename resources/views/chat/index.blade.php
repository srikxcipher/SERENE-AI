@extends('layouts.app')

@push('styles')
<style>
    .chat-container {
        height: calc(100vh - 200px);
    }
    .message-bubble {
        max-width: 80%;
    }
    .typing-indicator span {
        animation: blink 1.4s infinite;
        animation-fill-mode: both;
    }
    .typing-indicator span:nth-child(2) { animation-delay: .2s; }
    .typing-indicator span:nth-child(3) { animation-delay: .4s; }
    @keyframes blink {
        0% { opacity: .1; }
        20% { opacity: 1; }
        100% { opacity: .1; }
    }
</style>
@endpush

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-blue-600 p-4">
            <h1 class="text-white text-xl font-bold">Vultr AI Chatbot</h1>
        </div>
        
        <div class="flex flex-col h-full">
            <!-- Chat Messages -->
            <div class="chat-container p-4 overflow-y-auto" id="chat-messages">
                @foreach($messages as $message)
                    <div class="flex mb-4 {{ $message->type === 'user' ? 'justify-end' : 'justify-start' }}">
                        <div class="message-bubble rounded-lg p-3 {{ $message->type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200' }}">
                            {{ $message->message }}
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Typing Indicator -->
            <div class="typing-indicator hidden p-4">
                <div class="flex items-center text-gray-500">
                    <span class="h-2 w-2 bg-gray-500 rounded-full"></span>
                    <span class="h-2 w-2 bg-gray-500 rounded-full mx-1"></span>
                    <span class="h-2 w-2 bg-gray-500 rounded-full"></span>
                </div>
            </div>

            <!-- Message Input -->
            <div class="border-t p-4">
                <form id="chat-form" class="flex">
                    <input type="text" id="message-input" class="flex-1 rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500" placeholder="Type your message...">
                    <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">Send</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Training Form (Hidden by default) -->
    <div class="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-bold mb-4">Add Training Data</h2>
        <form id="training-form">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">Content</label>
                <textarea id="train-content" class="w-full border rounded p-2" rows="3"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">Description</label>
                <input type="text" id="train-description" class="w-full border rounded p-2">
            </div>
            <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Add Training Data</button>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function scrollToBottom() {
        const chatContainer = document.getElementById('chat-messages');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendMessage(message, isUser = false) {
        const html = `
            <div class="flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}">
                <div class="message-bubble rounded-lg p-3 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}">
                    ${message}
                </div>
            </div>
        `;
        $('#chat-messages').append(html);
        scrollToBottom();
    }

    $('#chat-form').on('submit', function(e) {
        e.preventDefault();
        const messageInput = $('#message-input');
        const message = messageInput.val().trim();
        
        if (!message) return;

        // Append user message
        appendMessage(message, true);
        messageInput.val('');

        // Show typing indicator
        $('.typing-indicator').removeClass('hidden');

        // Send message to server
        $.post('/chat/send', { message: message })
            .done(function(response) {
                $('.typing-indicator').addClass('hidden');
                appendMessage(response.message);
            })
            .fail(function(error) {
                $('.typing-indicator').addClass('hidden');
                appendMessage('Sorry, something went wrong. Please try again.', false);
            });
    });

    $('#training-form').on('submit', function(e) {
        e.preventDefault();
        const content = $('#train-content').val().trim();
        const description = $('#train-description').val().trim();

        if (!content || !description) return;

        $.post('/chat/train', {
            content: content,
            description: description
        })
        .done(function(response) {
            alert('Training data added successfully!');
            $('#train-content').val('');
            $('#train-description').val('');
        })
        .fail(function(error) {
            alert('Failed to add training data. Please try again.');
        });
    });

    // Initial scroll to bottom
    scrollToBottom();
});
</script>
@endpush