# AI-Powered Deli & Liquor Store Management System

An intelligent inventory, pricing, and operations management platform designed for retail liquor stores and delis. This system uses **AI-driven analysis** and **MCP (Model Context Protocol) servers** to automate workflows, optimize pricing, detect margin loss, and improve overall store efficiency.

---

## 📑 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Examples](#demo-examples)
- [Deployment](#deployment)

---

## 🧠 Introduction
The **AI-Powered Deli & Liquor Store Management System** streamlines daily retail operations by integrating inventory management, pricing automation, and invoice analysis into a single intelligent platform.  
Using **AI models**, **Streamlit UI**, and **MCP servers**, the system helps businesses:

- Maintain inventory levels  
- Identify price changes from suppliers  
- Automatically calculate shelf pricing  
- Track location of products  
- Scale operations across multiple stores

---

## 🚀 Features
- **AI-Powered Inventory Lookup**  
  Instantly find product details and in-store locations.

- **Automated Price Change Detection**  
  Upload supplier invoices to detect increases (e.g., “12% increase detected”).

- **Dynamic Price Calculation**  
  Add new products with auto-generated retail pricing.

- **MCP-Based Microservices**  
  Run AI logic in isolated servers for scalable, secure operations.

- **Cross-Platform Deployment**  
  Supports local, Docker-based, and cloud production environments.

---

## 🧰 Technologies
- **Streamlit** — Web application interface  
- **SQLite** — Default local database  
- **PostgreSQL** — Recommended for production  
- **Docker** — Containerization of MCP servers  
- **Python 3.8+** — Backend logic and AI tools  
- **MCP** — Model Context Protocol architecture

---

## 📦 Prerequisites

### **1. Install Python 3.8+**
- Download from python.org  
- Check **“Add Python to PATH”** during installation

### **2. Install Required Python Packages**
```bash
pip install streamlit pandas sqlite3
**Local Deployment:**
```bash
streamlit run app.py