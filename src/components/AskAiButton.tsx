"use client";
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { askAiAboutNotesAction } from "@/actions/note";
import "../styles/ai-response.css";

interface Props {
  user: User | null;
}

function AskAiButton({ user }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [questionText, setQuestionText] = useState("");
  const [question, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);



  const handleOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    }

    if (isOpen) {
      setQuestionText("");
    }
    setOpen(isOpen);
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestion = [...question, questionText];
    setQuestions(newQuestion);
    setQuestionText("");

    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      try {
        const response = await askAiAboutNotesAction(newQuestion, responses);
        if (response !== undefined) {
          const newResponses = [...responses, response];
          setResponses(newResponses);

          // Save chat history to localStorage
          localStorage.setItem(
            "chatHistory",
            JSON.stringify({ questions: newQuestion, responses: newResponses }),
          );
        }
      } catch (error) {
        console.error("AI request failed:", error);
        const errorMessage =
          "Sorry, I couldn't process your request. Please try again.";
        setResponses((prev) => [...prev, errorMessage]);

        // Save chat history to localStorage
        localStorage.setItem(
          "chatHistory",
          JSON.stringify({
            questions: newQuestion,
            responses: [...responses, errorMessage],
          }),
        );
      }

      setTimeout(scrollToBottom, 100);
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer gap-2">
          Ask AI <Bot className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="custom-scrollbar flex h-[85vh] max-w-full flex-col overflow-y-auto"
        ref={contentRef}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            AI Notes Assistant
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Get instant answers about your notes using AI
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-1 flex-col gap-6">
          {Array.isArray(question) &&
            question.map((question, index) => (
              <Fragment key={index}>
                <div className="ml-auto max-w-[80%]">
                  <p className="rounded-lg bg-blue-600 px-4 py-3 text-sm text-white shadow-sm">
                    {question}
                  </p>
                </div>

                {responses[index] && (
                  <div className="max-w-[80%]">
                    <p
                      className="bot-response text-muted-foreground text-sm"
                      dangerouslySetInnerHTML={{ __html: responses[index] }}
                    />
                  </div>
                )}
              </Fragment>
            ))}

          {isPending && (
            <div className="flex items-center gap-2 text-gray-500">
              <span className="h-2 w-2 animate-ping rounded-full bg-gray-400" />
              <span className="text-sm">Analyzing your notes...</span>
            </div>
          )}
        </div>

        <div className="bg-background mt-8 flex cursor-text flex-col rounded-lg border shadow-sm transition-colors hover:border-gray-300">
          <div
            className="flex items-end justify-between gap-4 p-4"
            onClick={() => textareaRef.current?.focus()}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about your notes..."
              className="light:text-black flex min-h-[40px] w-full resize-none justify-center border-0 bg-transparent p-0 text-base font-semibold shadow-none ring-0 outline-none placeholder:text-gray-400 focus:ring-0 focus-visible:ring-0 dark:text-white"
              rows={1}
              onKeyDown={handleKeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />

            <Button
              size="sm"
              className="h-8 w-8 cursor-pointer rounded-full bg-blue-600 p-0 hover:bg-blue-700"
              disabled={isPending}
              onClick={handleSubmit}
            >
              <ArrowUpIcon className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AskAiButton;
