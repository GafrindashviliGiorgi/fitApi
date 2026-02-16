import React, { useState, useRef, useEffect } from 'react';

// SVG Icons as components
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
    <circle cx="12" cy="5" r="2"></circle>
    <path d="M12 7v4"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LoaderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Chat Website'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: conversationMessages,
          max_tokens: 2000
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Response:', data);
        throw new Error(data.error?.message || `API error: ${response.status}`);
      }

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error details:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, there was an error: ${error.message}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <SparklesIcon />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Chat Assistant</h1>
              <p className="text-purple-100 text-sm">Powered by GPT-3.5 Turbo</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="w-16 h-16 mx-auto mb-4 opacity-50 flex items-center justify-center">
                  <BotIcon />
                </div>
                <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                <p className="text-sm">Ask me anything and I'll help you out!</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="bg-purple-500 p-2 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="bg-pink-500 p-2 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                    <UserIcon />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="bg-purple-500 p-2 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                <BotIcon />
              </div>
              <div className="bg-white/20 border border-white/20 rounded-2xl px-4 py-3">
                <LoaderIcon />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-6 bg-white/5 border-t border-white/20">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}