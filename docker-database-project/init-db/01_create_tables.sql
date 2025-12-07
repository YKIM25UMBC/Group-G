-- Users table for authentication and user management
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories for organizing recipes
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    category_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main recipes table
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    tiktok_url VARCHAR(500),
    original_video_url VARCHAR(500),
    creator_username VARCHAR(100),
    cooking_time INTEGER, -- in minutes
    servings INTEGER,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients table (many-to-many with recipes)
CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    ingredient_name VARCHAR(200) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grocery lists table
CREATE TABLE grocery_lists (
    grocery_list_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    list_name VARCHAR(100) DEFAULT 'My Grocery List',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grocery list items (many-to-many with grocery lists)
CREATE TABLE grocery_list_items (
    item_id SERIAL PRIMARY KEY,
    grocery_list_id INTEGER REFERENCES grocery_lists(grocery_list_id) ON DELETE CASCADE,
    ingredient_name VARCHAR(200) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    is_checked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_recipes_category_id ON recipes(category_id);
CREATE INDEX idx_ingredients_recipe_id ON ingredients(recipe_id);
CREATE INDEX idx_grocery_lists_user_id ON grocery_lists(user_id);
CREATE INDEX idx_grocery_items_list_id ON grocery_list_items(grocery_list_id);
