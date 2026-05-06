SUPPORT ECOSYSTEM & MICROSERVICES LAB
=======================================

PROJECT OVERVIEW
----------------
This project is a high-level exploration of distributed systems and microservices 
communication, originally conceived during a professional apprenticeship at Elisa. 
The goal was to solve a real-world logistics challenge: creating a seamless support 
bridge between employees and support staff via Microsoft Teams and a custom mobile interface.

The project serves as a technical laboratory for understanding how backends 
(Node.js/Express) interact with modern frontends (Expo/React Native) and 
specialized Python-based processing services.

ARCHITECTURAL "MASTERMIND" APPROACH
-----------------------------------
The system was built using a modular philosophy. Adopting a "Block-Based Development" 
strategy, each feature was built, tested, and isolated to ensure system integrity 
before being integrated into the core ecosystem.

Key Components:
* Mobile Frontend (Expo): Features a dynamic "Universal Layout" manager that toggles 
  UI components based on user roles (Admin vs. User).
* App Gateway: A centralized connection handler designed to manage traffic between 
  the frontend and various backend microservices, increasing system security.
* Python Image Processor: A specialized microservice using K-Means Clustering to 
  extract dominant color palettes from background images to automatically 
  re-theme the application UI.
* Service Management: A centralized Node.js ServiceManager that orchestrates 
  Logging, Database, and Python child processes with dependency tracking.

TECHNICAL CHALLENGES & TROUBLESHOOTING
--------------------------------------
This project showcases an ability to debug and pivot when facing technical roadblocks:

* CORS & Security: Implemented custom CORS policies to allow secure cross-domain 
  communication between the mobile app and server.
* Data Persistence Pivot: While MongoDB was successfully connected, I pivoted 
  to a JSON-based storage system for user accounts and palettes. This allowed 
  for immediate verification of data-saving logic while keeping the prototype 
  functional and lightweight.
* Modular Debugging: Enforced a modular structure to isolate AI-generated 
  code blocks, making it possible to identify exactly which part of a complex 
  system was failing.
* Resource Optimization: Moved from pixel-scanning to K-Means clustering in 
  Python to prevent memory exhaustion and optimize performance for mobile devices.

TECH STACK
----------
* Languages: JavaScript (Node.js), Python 3.13
* Frontend: Expo (React Native), Axios
* Backend: Express.js, Node v22.14.0
* Libraries: OpenCV, Scikit-learn, NumPy (Python); Mongoose, Socket.io (Node)
* Data Storage: JSON Files (Legacy support for MongoDB)
* Tools: NVM (Node Version Manager), Azure CLI, Ngrok

CURRENT PROJECT STATUS
----------------------
The project is a Functional Technical Proof of Concept.
[X] Active Connectivity: Frontend-to-Backend terminal communication.
[X] Microservice Pipeline: Working request pipeline to the Python Color Processor. (Via test file)
[ ] Data Persistence: Functioning account and theme data logging via JSON. 
[ ] Next Steps: Finalizing Azure Bot resource registration and migrating to 
    managed database storage.

---
Note: This project represents a period of intense self-driven learning 
(15+ hours a day), focusing on bridging the gap between theoretical 
software development and real-world infrastructure.
