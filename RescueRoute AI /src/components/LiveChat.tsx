import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Command Center',
      text: 'A-01, proceed to Memorial Hospital via Route A.',
      timestamp: '14:23',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      text: 'Copy that. ETA 4 minutes.',
      timestamp: '14:24',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'A-01 (Sarah)',
      text: 'Heavy traffic on Main St. Requesting override.',
      timestamp: '14:25',
      isOwn: false,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      toast.info('Voice recording started', {
        description: 'Speak your message...',
      });
      
      // Simulate recording (in a real app, you'd use Web Speech API)
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage = 'This is a voice message transcription';
        setInputValue(voiceMessage);
        toast.success('Voice message recorded', {
          description: 'Message ready to send',
        });
      }, 2000);
    } else {
      // Stop recording
      setIsRecording(false);
      toast.info('Recording stopped');
    }
  };

  return (
    <Card className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-4 sm:p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <h3 className="text-slate-900 dark:text-white">Dispatch Chat</h3>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={message.isOwn ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-700'}>
                  {message.sender.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 ${message.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-600 dark:text-zinc-400">{message.sender}</span>
                  <span className="text-xs text-slate-500 dark:text-zinc-500">{message.timestamp}</span>
                </div>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    message.isOwn
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-zinc-700 text-slate-900 dark:text-zinc-100'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
        />
        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
        <motion.div
          animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
        >
          <Button
            type="button"
            size="icon"
            className={`flex-shrink-0 ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-600 text-slate-700 dark:text-zinc-300'
            }`}
            onClick={handleVoiceRecording}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        </motion.div>
      </form>
    </Card>
  );
}