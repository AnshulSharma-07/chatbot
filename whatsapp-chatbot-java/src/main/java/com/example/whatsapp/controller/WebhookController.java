package com.example.whatsapp.controller;

import com.example.whatsapp.model.MessageRequest;
import com.example.whatsapp.model.MessageResponse;
import com.example.whatsapp.service.ChatbotService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebhookController {

    private static final Logger logger = LoggerFactory.getLogger(WebhookController.class);
    private final ChatbotService chatbotService;

    public WebhookController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<MessageResponse> handleWebhook(@Valid @RequestBody MessageRequest request) {
        logger.info("Incoming message: {}", request.getMessage());
        
        String replyText = chatbotService.processMessage(request.getMessage());
        
        MessageResponse response = new MessageResponse(replyText);
        logger.info("Outgoing reply: {}", response.getReply());
        
        return ResponseEntity.ok(response);
    }
}
