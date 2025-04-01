"use client";
import React, { Fragment, useRef, useState, useTransition } from "react";

import { Button } from "./ui/button";
import { ArrowUpIcon, Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { askAiAboutNotesAction } from "@/actions/note";
import "../styles/ai-response.css"

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


  const handleOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    }

    if (isOpen) {
      setQuestionText("");
      setQuestions([]);
      setResponses([]);
    }
    setOpen(isOpen);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef= useRef<HTMLDivElement>(null)

  const handleInput = ()=>{
const textarea = textareaRef.current;
if (!textarea) {
    return
}

if (textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}
  }

const handleClickInput = ()=>{
    textareaRef.current?.focus();
}

const handleSubmit = () => {
    // Fix the empty check condition
    if (!questionText.trim()) {
      return;
    }
  
    const newQuestion = [...question, questionText];
    setQuestions(newQuestion);
    setQuestionText("");
    
    setTimeout(scrollToBottom, 100);
  
    startTransition(async () => {
      try {
        const response = await askAiAboutNotesAction(
          newQuestion,
          responses
        );
        
        if (response !== undefined) {
          setResponses((prev) => [...prev, response]);
        }
      } catch (error) {
        console.error("AI request failed:", error);
        setResponses((prev) => [
          ...prev,
          "Sorry, I couldn't process your request. Please try again.",
        ]);
      }
      
      setTimeout(scrollToBottom, 100);
    });
  };

const scrollToBottom = ()=>{
    contentRef.current?.scrollTo({
        top : contentRef.current.scrollHeight,
        behavior : "smooth"
    })
}

const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key==="Enter" && !e.shiftKey){
        e.preventDefault();
        handleSubmit();
    }

}
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogTrigger asChild>
      <Button variant="secondary" className="gap-2 cursor-pointer">
        Ask AI <Bot className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="custom-scrollbar flex h-[85vh] max-w-full flex-col overflow-y-auto" ref={contentRef}>
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">AI Notes Assistant</DialogTitle>
        <DialogDescription className="text-base text-gray-500">
          Get instant answers about your notes using AI
        </DialogDescription>
      </DialogHeader>
  
      <div className="mt-4 flex flex-1 flex-col gap-6">
        {question.map((question, index) => (
          <Fragment key={index}>
            {/* User Question Bubble */}
            <div className="ml-auto max-w-[80%]">
              <p className="rounded-lg bg-blue-600 px-4 py-3 text-sm text-white shadow-sm">
                {question}
              </p>
            </div>
  
            {/* AI Response */}
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
  
      {/* Input Area */}
      <div className="mt-8 flex cursor-text flex-col rounded-lg border bg-background shadow-sm transition-colors hover:border-gray-300">
        <div 
          className="flex items-end justify-between gap-4 p-4"
          onClick={handleClickInput}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Ask me anything about your notes..."
            className="   flex justify-center min-h-[40px] w-full resize-none border-0 bg-transparent p-0 text-base dark:text-white light:text-black font-semibold shadow-none outline-none ring-0 placeholder:text-gray-400 focus:ring-0 focus-visible:ring-0"
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          
          <Button 
            size="sm" 
            className=" cursor-pointer h-8 w-8 rounded-full bg-blue-600 p-0 hover:bg-blue-700"
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
