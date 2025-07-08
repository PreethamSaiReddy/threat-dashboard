# 🛡️ Cyber Threat Intelligence Dashboard

A full‑stack web application for visualizing and analyzing cyber threat data.

---

## Stack 🧱

- **Frontend**: React (via Vite)
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

---

## Features

- Displays a list of cyber threats with:
  - Category (Malware, Phishing, Ransomware, DDoS, etc.)
  - Cleaned description
  - Severity score
- Provides basic stats including:
  - Total number of threats
  - Distribution by category
  - Distribution by severity
- Server-side pagination & search/filter support
- DB seeding with sample data
- Full-stack containerized setup

--- 

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose installed
- Git

### Clone and Run

```bash
git clone https://github.com/PreethamSaiReddy/threat-dashboard.git
cd threat-dashboard
docker-compose up --build
