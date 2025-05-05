import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css';
import Swal from "sweetalert2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Oval } from 'react-loader-spinner';
import emailjs from '@emailjs/browser';

const ChatBox = ({ micEnabled , userEmail }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState('');
  const messagesEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const recognition = useRef(null);

// Speech recognition initialization
useEffect(() => {
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;

    recognition.current.onstart = () => setIsListening(true);
    recognition.current.onend = () => setIsListening(false);

    recognition.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      if (event.results[0].isFinal) {
        setUserInput(transcript);
      }
    };
  }
}, []);

  // Initialize interview
  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    try {
      const prompt = "Start a professional interview. Begin with asking the candidate to introduce themselves.";
      const response = await generateResponse(prompt);
      setMessages([{ text: response, type: 'ai' }]);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const generateResponse = async (prompt) => {
    setIsProcessing(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeSentiment = async () => {
    const prompt = `Analyze this interview conversation and provide detailed sentiment analysis with areas of improvement:\n\n${conversationHistory}`;
    const analysis = await generateResponse(prompt);
    return analysis;
  };

  useEffect(() => {
    if (userInput) {
      const newMessage = { text: userInput, type: 'user' };
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation history
      const updatedHistory = `${conversationHistory}\nCandidate: ${userInput}`;
      setConversationHistory(updatedHistory);

      generateNextQuestion(updatedHistory);
    }
  }, [userInput]);

  const generateNextQuestion = async (history) => {
    try {
      const prompt = `Act as an interviewer. Based on this conversation, ask the next relevant question:\n${history}`;
      const response = await generateResponse(prompt);
      
      const aiMessage = { text: response, type: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setConversationHistory(prev => `${prev}\nInterviewer: ${response}`);
      
      // Check if interview should end
      if (response.toLowerCase().includes('thank you') || 
          response.toLowerCase().includes('conclude')) {
        endInterview();
      }
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };
 
  const sendEmail = async (analysis) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: userData.name,
          to_email: userEmail,
          analysis: analysis,
          interview_date: new Date().toLocaleDateString(),
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );
    } catch (error) {
      console.error('Failed to send email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Email Failed',
        text: 'Could not send analysis email, but interview was completed.',
      });
    }
  };
  
  // Update your endInterview function
  const endInterview = async () => {
    try {
      const analysis = await analyzeSentiment();
      
      // Send to Strapi
      await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/interviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          transcript: conversationHistory,
          analysis: analysis
        })
      });
  
      // Send email
      await sendEmail(analysis);
  
      Swal.fire({
        icon: "success",
        text: "Interview completed! Check your email for the analysis report.",
        // ... rest of config
      });
    } catch (error) {
      // Handle errors
    }
  }; 

  // Add this useEffect to auto-scroll messages
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Disable mic during processing
useEffect(() => {
  if (isProcessing) {
    recognition.current?.stop();
  }
}, [isProcessing]);

// Mic control
useEffect(() => {
  if (micEnabled) {
    recognition.current?.start();
  } else {
    recognition.current?.stop();
  }
}, [micEnabled]);
  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'ai' ? 'ai-message' : 'user-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="status">
        {isProcessing ? (
          <Oval color="#00BFFF" height={20} width={20} />
        ) : (
          micEnabled
            ? (isListening ? 'Listening...' : 'Waiting for your response...')
            : 'Mic is disabled.'
        )}
      </div>
    </div> 
  );
};

export default ChatBox;