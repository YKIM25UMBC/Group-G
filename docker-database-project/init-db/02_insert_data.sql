-- Insert sample users
INSERT INTO users (username, email, password_hash) VALUES 
('sarahchen', 'sarah.chen@example.com', '$2b$10$examplehashedpassword123'),
('mariagarcia', 'maria.garcia@example.com', '$2b$10$examplehashedpassword456'),
('davidrod', 'david.rodriguez@example.com', '$2b$10$examplehashedpassword789');

-- Insert sample categories
INSERT INTO categories (user_id, category_name) VALUES 
(1, 'Quick Lunches'),
(1, 'Weekend Projects'),
(2, 'Desserts'),
(2, 'Healthy Meals'),
(3, 'Mexican Cuisine');

-- Insert sample recipes
INSERT INTO recipes (user_id, category_id, title, description, tiktok_url, creator_username, cooking_time, servings, instructions) VALUES 
(1, 1, 'Creamy Garlic Pasta', 'Quick and easy creamy garlic pasta recipe found on TikTok', 'https://tiktok.com/@spicequeen/video/12345', 'spicequeen', 15, 2, '1. Cook pasta according to package instructions. 2. In a pan, sauté garlic in olive oil. 3. Add cream and parmesan. 4. Combine with pasta and serve.'),
(1, 2, 'Homemade Pizza', 'Weekend pizza project with homemade dough', 'https://tiktok.com/@pizzamaster/video/67890', 'pizzamaster', 120, 4, '1. Prepare dough and let rise for 1 hour. 2. Roll out dough and add toppings. 3. Bake at 475°F for 12-15 minutes.'),
(2, 3, 'Chocolate Chip Cookies', 'The best chewy chocolate chip cookies', 'https://tiktok.com/@bakingqueen/video/54321', 'bakingqueen', 25, 24, '1. Cream butter and sugars. 2. Add eggs and vanilla. 3. Mix in dry ingredients. 4. Fold in chocolate chips. 5. Bake at 375°F for 10-12 minutes.');

-- Insert sample ingredients
INSERT INTO ingredients (recipe_id, ingredient_name, quantity, unit) VALUES 
(1, 'Pasta', '200', 'g'),
(1, 'Garlic', '3', 'cloves'),
(1, 'Heavy cream', '1', 'cup'),
(1, 'Parmesan cheese', '½', 'cup'),
(2, 'All-purpose flour', '500', 'g'),
(2, 'Yeast', '7', 'g'),
(2, 'Tomato sauce', '1', 'cup'),
(2, 'Mozzarella cheese', '2', 'cups'),
(3, 'All-purpose flour', '280', 'g'),
(3, 'Butter', '1', 'cup'),
(3, 'Brown sugar', '¾', 'cup'),
(3, 'Chocolate chips', '2', 'cups');

-- Insert sample grocery lists
INSERT INTO grocery_lists (user_id, list_name) VALUES 
(1, 'Weekly Shopping'),
(2, 'Baking Supplies');

-- Insert sample grocery list items
INSERT INTO grocery_list_items (grocery_list_id, ingredient_name, quantity, unit, is_checked) VALUES 
(1, 'Pasta', '1', 'package', FALSE),
(1, 'Garlic', '5', 'cloves', TRUE),
(1, 'Heavy cream', '1', 'carton', FALSE),
(2, 'All-purpose flour', '5', 'lbs', FALSE),
(2, 'Chocolate chips', '1', 'bag', FALSE),
(2, 'Butter', '2', 'cups', TRUE);