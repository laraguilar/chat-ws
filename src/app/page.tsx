'use client'
import { Message } from "@/components/Message";
import { GesonelJPEG, PatinhoFeioJPEG } from "@/icons";
import { socket } from "@/socket";
import { randomUUID } from "crypto";
import { Preahvihear } from "next/font/google";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

interface IFormState {
  inputValue: string;
}

interface IMessage {
  id: string,
  name: string,
  text: string,
  image: StaticImageData,
  isOwner?: boolean
}

export default function Home() {
  const [socketInstance] = useState(socket());
  const [formState, setFormState] = useState<IFormState>({ inputValue: '' });

  const [messages, setMessages] = useState<IMessage[]>([]);

  // listar eventos
  useEffect(() => {
    socketInstance.on("message", (messageReceived) => {
      setMessages((prev) => [
        ...prev,
        messageReceived
      ]);
    });

    return () => {
      // para de ouvir o socket
      socketInstance.off("message");
    }
  }, [])


  // Função para lidar com a alteração no campo de entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ inputValue: event.target.value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMessage = {
      text: formState.inputValue,
      image: GesonelJPEG,
      id: randomUUID,
    }

    socketInstance.emit("message", newMessage);

    setMessages((prev) => [
      ...prev,
      { ...newMessage, image: PatinhoFeioJPEG, isOwner: true }
    ]);

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-base xs:text-xs sm:text-xs md:text-sm">
      <div className="flex min-h-screen flex-col items-center justify-between box w-4/5 h-dvh">
        <div className="w-4/5 md:w-2/3 h-4/5 align-middle mt-8">
          <div className="header bg-slate-700 rounded-t-lg p-4">
              Chat Sala 1
          </div>

          <div className="chat relative bg-slate-900 border border-slate-700 h-full overflow-auto">    
            <div className="messages">
              {
                messages.map(message => (
                  <Message text={message.text} image={message.image} isOwner={message.isOwner}/>

                ))
              }
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="flex">
              <input type="text" name="text" onChange={handleInputChange} value={formState.inputValue} className="bg-slate-700 rounded-bl-lg h-12 w-full p-4 focus:ring-transparent" />
              <button type="submit"  className="px-4 flex-shrink-0 inline-flex justify-center items-center  text-sm font-semibold rounded-r-md  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none gap-2 align-middle">
              Send 
              <IoMdSend /> 
              </button>
            </form>
        </div>
      </div>
    </main>
  )
}
