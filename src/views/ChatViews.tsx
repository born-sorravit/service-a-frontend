"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/stores/user/user.modal";
import { formatNumber } from "@/utils/formatNumber";

export default function ChatViews() {
  const { user } = useUserStore();

  const chatSocketRef = useRef<Socket | null>(null);
  const balanceSocketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );

  useEffect(() => {
    // เชื่อมต่อเพียงครั้งเดียว
    const chatSocket = io("http://localhost:3000/chat", {
      transports: ["websocket"],
    });

    const balanceSocket = io("http://localhost:3000/balance", {
      transports: ["websocket"],
      auth: { userId: "4445fa40-badb-490e-84a2-61df296ff253" },
    });

    chatSocketRef.current = chatSocket;
    balanceSocketRef.current = balanceSocket;

    chatSocket.on("connect", () => {
      console.log("Connected to chat server:", chatSocket.id);
    });

    balanceSocket.on("connect", () => {
      console.log("Connected to balance server:", balanceSocket.id);
    });

    balanceSocket.on("get_balance", (data) => {
      console.log("Balance received:", data.balance);
      setBalance(data.balance); // อัปเดต balance แบบ realtime
    });

    chatSocket.on("new_message", (message) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      chatSocket.disconnect();
      balanceSocket.disconnect();
    };
  }, []);

  const withdrawBalance = () => {
    if (chatSocketRef.current && input !== null) {
      chatSocketRef.current.emit("send_message", {
        user: user?.username || "Anonymous",
        message: `withdraw ${formatNumber(input)}`,
      });
    }
    if (balanceSocketRef.current && input !== null) {
      balanceSocketRef.current.emit("withdraw_balance", {
        userId: "4445fa40-badb-490e-84a2-61df296ff253",
        amount: Number(input),
      });
    }
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // เรียกทุกครั้งที่ messages อัปเดต
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-bold">
            💬 Chat with Socket.IO
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Balance:{" "}
            {balance !== null
              ? `$${formatNumber(balance.toString())}`
              : "Loading..."}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4">
          {/* Chat Messages */}
          <div className="flex flex-col gap-2 h-64 overflow-y-auto p-2 bg-muted rounded-lg">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center mt-10">
                No messages yet. Start chatting!
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg w-fit max-w-[80%] ${
                  m.user === (user?.username || "Anonymous")
                    ? "bg-primary text-primary-foreground self-end"
                    : "bg-secondary text-secondary-foreground self-start"
                }`}
              >
                <span className="block text-xs opacity-70">{m.user}</span>
                <span>{m.message}</span>
              </div>
            ))}

            {/* div ไว้ scroll เข้า */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Button */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9.]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && withdrawBalance()}
            />
            <Button onClick={withdrawBalance}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
