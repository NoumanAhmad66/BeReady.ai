import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';
import Swal from "sweetalert2";

const ChatBox = ({ micEnabled}) => {
  const [messages, setMessages] = useState([
    { text: 'Tell me about yourself', type: 'ai' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const recognition = useRef(null);

  // Predefined AI questions
  const questions = [
    'Tell me about yourself',
    'Nice to meet you! Can you tell me why you are interested in this role?',
    'What are your key strengths?',
    'Do you have any questions for us?',
    'Thank you! That concludes our interview.',
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onstart = () => setIsListening(true);
      recognition.current.onend = () => setIsListening(false);

      // Process speech input
      recognition.current.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim();
        const isFinal = event.results[event.resultIndex].isFinal;

        if (isFinal) {
          setUserInput(transcript);
        }
      };
    }
  }, []);

  // Start/stop listening based on micEnabled
  useEffect(() => {
    if (micEnabled) {
      recognition.current?.start();
    } else {
      recognition.current?.stop();
    }
  }, [micEnabled]);

  // Handle user input and simulate AI response
  useEffect(() => {
    if (userInput) {
      // Add user's message
      const userMessage = { text: userInput, type: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Clear user input after processing
      setUserInput('');

      // Simulate AI response after 1 second
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setTimeout(() => {
          const aiMessage = { text: questions[nextQuestionIndex], type: 'ai' };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
          setCurrentQuestionIndex(nextQuestionIndex);
        }, 1000);
      }
      else {
        // Last question logic
        setTimeout(() => {
            Swal.fire({
                icon: "success", // Success icon
                text: "Thank you & You will receive your interview results via email ",
                customClass:{
                  popup: "custom-popup",

                },
                timer: 10000, // Alert stays visible for 30 seconds (30000ms)
                timerProgressBar: true, // Optional: Adds a progress bar to show countdown
              }).then(() => {
                window.location.href = '/Interview'; // Redirect to home screen after alert closes
              });

        }, 1000);
      }
    }
  }, [userInput, currentQuestionIndex]);

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
      </div>

      {/* Status */}
      <div className="status">
        {micEnabled
          ? isListening
            ? 'Listening...'
            : 'Waiting for your response...'
          : 'Mic is disabled.'}
      </div>
      

    </div>
  );
};

export default ChatBox;
