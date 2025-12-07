# Digital Cookbook Database

This is the database setup for The Chefs' Digital Cookbook project using Docker and PostgreSQL.

## Database Schema

The database contains the following main tables:
- `users` - User accounts and authentication
- `recipes` - Recipe data with TikTok integration
- `ingredients` - Recipe ingredients with quantities
- `categories` - User-defined recipe categories
- `grocery_lists` - User grocery lists
- `grocery_list_items` - Items within grocery lists

## Quick Start

1. **Start the database:**
   ```bash
   docker compose up -d