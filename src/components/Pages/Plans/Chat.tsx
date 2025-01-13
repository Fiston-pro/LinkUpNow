import { useState, useCallback } from "react";
import { MdSend } from "react-icons/md";
import Image from "next/image";
import { users } from "../../../../lib/user";
import Modal from "@/components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "@/redux/plansSlice";
import { RootState } from "@/redux/store";

const GroupChat = ({ isOpen, onClose, plan }) => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.loggedInUser);

  const handleSendMessage = useCallback(() => {
    if (!newMessage) return;

    dispatch(
      addChatMessage({
        planId: plan.plan_id,
        userId: user.id,
        message: newMessage,
        timestamp: new Date().toLocaleString(),
      })
    );

    setNewMessage("");
  }, [dispatch, newMessage, plan.plan_id, user.id]);

  const getUserById = useCallback((userId) => {
    return users.find((user) => user.id === userId);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-between h-screen px-8 pt-14 backdrop-blur-md bg-[rgba(26,16,52,0.7)] text-white rounded-3xl shadow-2xl overflow-hidden">
        <header className="flex flex-col mb-6 border-b border-secondary pb-4">
          <h2 className="text-xl font-bold text-white tracking-wide">Plan Group Chat</h2>
          <p className="text-sm text-textSecondary mt-1">Connect with your group on this plan</p>
        </header>

        {/* Chat Messages */}
        <section className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {plan?.groupChat.map((msg) => {
            const sender = getUserById(msg.userId);
            const isUser = msg.userId === user.id;
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-center space-x-2 relative`}>
                {!isUser && sender && (
                  <div className="w-10 h-10">
                    <Image
                      src={sender.profilePic}
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
                  <p className="font-medium mb-1">{isUser ? 'You' : sender?.name}</p>
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-xs text- block mt-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}
        </section>

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
            <MdSend className="text-2xl" />
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default GroupChat;
