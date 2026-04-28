# WhatsApp Chatbot Backend (Java Spring Boot)

This project provides a simulation of a WhatsApp chatbot webhook.

## 🚀 How to Run Locally

### Prerequisites
- JDK 17 (or 21)
- Maven 3.8+

### Steps
1. **Clone/Download** the project folder.
2. Open a terminal in the directory where `pom.xml` is located.
3. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
4. The server will start on `http://localhost:8080`.

## 📡 API Documentation
Once running, you can access the **Swagger UI** to explore and test the endpoints:
- `http://localhost:8080/swagger-ui/index.html`

## 🧪 Postman Testing

### POST /webhook
**URL:** `http://localhost:8080/webhook`  
**Body (JSON):**
```json
{
  "message": "Hi"
}
```

**Expected Response (200 OK):**
```json
{
  "reply": "Hello"
}
```

## 🛠 Project Structure
- `com.example.whatsapp`: Main entry point.
- `com.example.whatsapp.controller`: REST endpoints (Webhook handles logic).
- `com.example.whatsapp.service`: Business logic for message processing.
- `com.example.whatsapp.model`: DTOs for request/response.
- `com.example.whatsapp.exception`: Global error handling.

## 🌟 Real-world Improvements
- **Security**: Implement HMAC signature verification (standard for WhatsApp/Twilio).
- **Persistence**: Use Spring Data JPA (PostgreSQL) to store chat history.
- **Async Processing**: Use RabbitMQ or Kafka for high-volume message handling.
- **Provider Integration**: Swap the simulation for the actual Twilio or Meta WhatsApp Business API.
