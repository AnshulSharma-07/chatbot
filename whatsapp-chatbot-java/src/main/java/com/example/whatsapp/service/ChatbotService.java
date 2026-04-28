package com.example.whatsapp.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    /**
     * Processes input message and returns a simulated bot reply.
     * 
     * @param input the message from the user
     * @return the automated response string
     */
    public String processMessage(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "Please type something!";
        }

        String message = input.trim().toLowerCase();

        switch (message) {
            case "hi":
            case "hello":
                return "Hello";
            case "bye":
            case "goodbye":
                return "Goodbye";
            default:
                return "I didn’t understand that";
        }
    }
}
