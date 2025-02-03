'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DummyImage from '../../../../images/Users/dummyImageUser.jpg';
import { ref, onValue, push, set } from 'firebase/database';
import { chatdb } from '@/lib/firebase/initFirebase';

import { usePathname } from 'next/navigation'

import { useAuth } from '@/components/AuthContext';

const getUserById = (id, messages) => {
  return messages.find((msg) => msg.userId === id);
};

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [planId, setPlanId] = useState('');

  const pathname = usePathname();

  const { user } = useAuth();

  useEffect(() => {
    const parts = pathname.split('/');
    const planId = parts[2]; // This will give you '1737397179478'
    setPlanId(planId);

    const messagesRef = ref(chatdb, 'messages/' + planId);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    console.log('the whole user here:', user)
    console.log('user id is here: ', user.id)

    const messagesRef = ref(chatdb, 'messages/' + planId);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      userId: user.uid,
      message: newMessage,
      name: user.name,
      photoURL: user.photoURL,
      timestamp: new Date().toISOString(),
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col justify-between h-screen px-8 pt-14 backdrop-blur-md bg-[rgba(26,16,52,0.7)] text-white rounded-3xl shadow-2xl overflow-hidden">
      <header className="flex flex-col mb-6 border-b border-secondary pb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Plan Group Chat</h2>
        <p className="text-sm text-textSecondary mt-1">Connect with your group on this plan</p>
      </header>

      {/* Chat Messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.map( (msg) => {
          
          const sender = getUserById(msg.userId, messages);
          console.log('msg uid:', msg.userId)
          console.log('user uid:', user.uid)
          const isUser = msg.userId === user.uid;

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-center space-x-2 relative`}>
              {!isUser && sender && (
                <div className="w-10 h-10">
                  <Image
                    src={ msg.photoURL || DummyImage}
                    alt={sender.name}
                    width={40}
                    height={40}
                    className="object-cover border-2 border-cardBgLight rounded-full h-10 w-10"
                  />
                </div>
              )}
              <div
                className={`relative max-w-xs px-4 py-3 rounded-2xl shadow-xl text-textPrimary ${isUser
                  ? 'bg-gradient-to-br from-[#242830] to-[#2b2f33]'
                  : 'bg-gradient-to-br from-secondary to-[#2b2f33]'
                  }`}
              >
                <p className="font-medium mb-1">{isUser ? 'You' : (msg.name || 'User')}</p>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Message Input */}
      <footer className="p-4 rounded-full flex items-center shadow-lg mt-6">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-full bg-[rgba(46,42,90,0.7)] text-white placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-highlight shadow-inner"
          aria-label="Message input"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 p-3 bg-highlight text-white rounded-full hover:bg-orange-600 transition duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-600 animate-pulse"
          aria-label="Send message"
          type="button"
        >
          Send
        </button>
      </footer>
    </div>
  );
}