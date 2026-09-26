import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Bot,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SpeechRecognitionResultLike = { 0?: { transcript?: string } };
type SpeechRecognitionEventLike = { results: ArrayLike<SpeechRecognitionResultLike> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const WELCOME_MESSAGE: UIMessage = {
  id: "meridian-welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Welcome. I’m Meridian, Market Strategy’s support assistant. Ask me about our services, industries, process, or how to start a conversation with our team.",
    },
  ],
};

const QUICK_PROMPTS = [
  "What services do you offer?",
  "Which industries do you work with?",
  "How do I start a conversation?",
];

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function useVoiceSupport(onTranscript: (text: string) => void) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);

  useEffect(() => {
    const supported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setVoiceAvailable(supported || "speechSynthesis" in window);
  }, []);

  const startListening = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) return;
    const browserWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) onTranscript(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { voiceAvailable, isListening, isSpeaking, startListening, stopListening, speak, stopSpeaking };
}

export function SupportAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, error } = useChat({
    id: "market-strategy-support-session",
    messages: [WELCOME_MESSAGE],
    transport,
    onError: () => undefined,
  });
  const busy = status === "submitted" || status === "streaming";
  const lastAssistantMessage = [...messages].reverse().find((message) => message.role === "assistant");
  const voice = useVoiceSupport((transcript) => {
    setInput((current) => (current ? `${current} ${transcript}` : transcript));
    inputRef.current?.focus();
  });

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (status === "ready" && voiceEnabled && lastAssistantMessage && lastAssistantMessage.id !== WELCOME_MESSAGE.id) {
      const text = getMessageText(lastAssistantMessage);
      if (text) voice.speak(text);
    }
  }, [status, voiceEnabled, lastAssistantMessage?.id]);

  const submit = async ({ text }: { text: string }) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    await sendMessage({ text: trimmed });
    inputRef.current?.focus();
  };

  return (
    <div className="support-assistant fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {open && (
        <section
          aria-label="Market Strategy customer support assistant"
          className="mb-4 flex h-[min(680px,calc(100vh-7rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden border border-navy/15 bg-background shadow-2xl shadow-navy-deep/20"
        >
          <header className="flex items-center justify-between border-b border-border bg-navy-deep px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-gold/60 bg-navy text-gold" aria-hidden="true">
                <span className="font-display text-lg">M</span>
              </div>
              <div>
                <p className="font-display text-xl leading-none">Meridian</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/60">Market Strategy support</p>
              </div>
            </div>
            <Button aria-label="Close support assistant" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)} size="icon" variant="ghost">
              <X />
            </Button>
          </header>

          <Conversation className="min-h-0 flex-1 bg-background">
            <ConversationContent className="gap-5 p-4">
              {messages.length === 0 ? (
                <ConversationEmptyState icon={<Bot className="size-8 text-gold" />} title="How can we help?" description="Ask about our work, industries, or process." />
              ) : (
                messages.map((message) => {
                  const text = getMessageText(message);
                  if (!text && message.role !== "assistant") return null;
                  return (
                    <Message key={message.id} from={message.role} className="max-w-[92%]">
                      <MessageContent className={cn(message.role === "user" && "bg-navy text-white") }>
                        {message.role === "assistant" ? <MessageResponse isAnimating={status === "streaming" && message.id === lastAssistantMessage?.id}>{text}</MessageResponse> : <p className="whitespace-pre-wrap">{text}</p>}
                      </MessageContent>
                    </Message>
                  );
                })
              )}
              {status === "submitted" && <Shimmer className="px-1 text-sm text-muted-foreground">Thinking through that…</Shimmer>}
              {error && <p className="px-1 text-xs text-destructive" role="alert">The assistant could not respond. Please try again.</p>}
            </ConversationContent>
            <ConversationScrollButton aria-label="Scroll to latest message" />
          </Conversation>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
              {QUICK_PROMPTS.map((prompt) => <button className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground" key={prompt} onClick={() => void submit({ text: prompt })} type="button">{prompt}</button>)}
            </div>
          )}

          <div className="border-t border-border bg-card p-3">
            <PromptInput onSubmit={submit}>
              <PromptInputTextarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Market Strategy…" disabled={busy} aria-label="Ask Market Strategy a question" />
              <PromptInputFooter className="justify-between">
                <div className="flex items-center gap-1">
                  {voice.voiceAvailable && (
                    <Button aria-label={voice.isListening ? "Stop listening" : "Speak your question"} className={cn(voice.isListening && "text-destructive")} onClick={voice.isListening ? voice.stopListening : voice.startListening} size="icon" type="button" variant="ghost">
                      {voice.isListening ? <MicOff /> : <Mic />}
                    </Button>
                  )}
                  {voice.voiceAvailable && (
                    <Button aria-label={voiceEnabled ? "Turn off spoken answers" : "Turn on spoken answers"} className={cn(voice.isSpeaking && "text-gold")} onClick={() => { setVoiceEnabled((enabled) => !enabled); if (voice.isSpeaking) voice.stopSpeaking(); }} size="icon" type="button" variant="ghost">
                      {voiceEnabled ? <Volume2 /> : <VolumeX />}
                    </Button>
                  )}
                </div>
                <PromptInputSubmit status={status} disabled={!input.trim() && !busy} onStop={stop} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 px-1 text-[0.65rem] leading-relaxed text-muted-foreground">For confidential, financial, legal, or investment matters, please speak directly with our advisory team.</p>
          </div>
        </section>
      )}

      <Button aria-expanded={open} aria-label={open ? "Close customer support assistant" : "Open customer support assistant"} className="group size-14 rounded-full bg-gold text-navy-deep shadow-xl shadow-navy-deep/25 transition-transform hover:bg-gold-soft hover:scale-105" onClick={() => setOpen((visible) => !visible)}>
        {open ? <X /> : <Headphones className="transition-transform group-hover:rotate-6" />}
      </Button>
      {!open && <span className="sr-only">Chat with Meridian, Market Strategy’s customer support assistant</span>}
    </div>
  );
}