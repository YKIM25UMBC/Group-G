# app.py - Complete all-in-one solution
import streamlit as st
import sqlite3
import pandas as pd
import os

# Initialize databases
def setup_databases():
    if not os.path.exists('data'):
        os.makedirs('data')
    
    # Inventory database
    conn = sqlite3.connect('data/inventory.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            front_location TEXT NOT NULL,
            back_location TEXT NOT NULL,
            current_stock INTEGER,
            cost_price REAL,
            selling_price REAL
        )
    ''')
    
    # Check if we need to add sample data
    cursor.execute("SELECT COUNT(*) FROM products")
    if cursor.fetchone()[0] == 0:
        products = [
            ('Jack Daniels 750ml', 'Liquor', 'A1', 'B5', 8, 18.50, 24.05),
            ('Corona Extra 6-pack', 'Beer', 'B1', 'C3', 24, 8.75, 11.38),
            ('Lays Potato Chips', 'Snacks', 'D1', 'E4', 48, 2.30, 2.99),
            ('Heineken 6-pack', 'Beer', 'B2', 'C4', 18, 9.25, 12.03),
            ('Boars Head Turkey', 'Deli', 'E1', 'F2', 5, 8.95, 11.64)
        ]
        cursor.executemany('''
            INSERT INTO products (name, category, front_location, back_location, current_stock, cost_price, selling_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', products)
    conn.commit()
    conn.close()
    
    # Pricing database
    conn = sqlite3.connect('data/pricing.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS price_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL,
            cost_price REAL NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    
    # Check if we need to add sample data
    cursor.execute("SELECT COUNT(*) FROM price_history")
    if cursor.fetchone()[0] == 0:
        price_data = [
            ('Jack Daniels 750ml', 16.50, '2024-01-15'),
            ('Jack Daniels 750ml', 18.50, '2024-03-15'),
            ('Corona Extra 6-pack', 8.25, '2024-01-15'),
            ('Corona Extra 6-pack', 8.75, '2024-03-15'),
            ('Lays Potato Chips', 2.10, '2024-01-15'),
            ('Lays Potato Chips', 2.30, '2024-03-15')
        ]
        cursor.executemany('''
            INSERT INTO price_history (product_name, cost_price, date)
            VALUES (?, ?, ?)
        ''', price_data)
    conn.commit()
    conn.close()
    
    # Create sample invoice if it doesn't exist
    if not os.path.exists('sample_invoice.csv'):
        with open('sample_invoice.csv', 'w') as f:
            f.write("""Product,Cost,Supplier,Quantity
Jack Daniels 750ml,18.50,Liquor Distributors,12
Corona Extra 6-pack,8.75,Beer Company,24
Lays Potato Chips,2.30,Snack Supplier,48""")

# Database connection functions
def get_inventory_db():
    return sqlite3.connect('data/inventory.db')

def get_pricing_db():
    return sqlite3.connect('data/pricing.db')

# Main app
def main():
    # Setup databases automatically when app starts
    setup_databases()
    
    st.set_page_config(page_title="Deli Store System", layout="wide")
    st.title("🏪 Deli Store Management System")
    
    tab1, tab2, tab3 = st.tabs(["📦 Find Products", "💰 Analyze Prices", "➕ Add Product"])
    
    with tab1:
        st.header("Product Location Finder")
        product = st.text_input("Enter product name:", placeholder="Jack Daniels, Corona, Lays Chips")
        
        if st.button("🔍 Find Product") and product:
            conn = get_inventory_db()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products WHERE name LIKE ?", (f'%{product}%',))
            result = cursor.fetchone()
            conn.close()
            
            if result:
                st.success(f"✅ Found: {result[1]}")
                st.write(f"**Category**: {result[2]}")
                st.write(f"**Front Shelf**: {result[3]}")
                st.write(f"**Back Stock**: {result[4]}")
                st.write(f"**Current Stock**: {result[5]}")
                st.write(f"**Cost Price**: ${result[6]:.2f}")
                
                if result[5] < 10:
                    st.warning("🚨 Low stock alert!")
            else:
                st.error("Product not found. Try: Jack Daniels, Corona, Lays Chips")
    
    with tab2:
        st.header("Price Analysis")
        
        st.info("Upload the sample_invoice.csv file to see price analysis")
        uploaded_file = st.file_uploader("Choose CSV file", type=['csv'])
        
        if uploaded_file:
            df = pd.read_csv(uploaded_file)
            st.subheader("📋 Invoice Contents")
            st.dataframe(df)
            
            st.subheader("💰 Price Analysis")
            for index, row in df.iterrows():
                conn = get_pricing_db()
                cursor = conn.cursor()
                cursor.execute("SELECT cost_price FROM price_history WHERE product_name = ? ORDER BY date DESC LIMIT 1", (row['Product'],))
                old_price_result = cursor.fetchone()
                conn.close()
                
                if old_price_result:
                    old_price = old_price_result[0]
                    new_price = row['Cost']
                    increase = ((new_price - old_price) / old_price) * 100
                    
                    if increase > 0:
                        st.warning(f"**{row['Product']}**")
                        st.write(f"Price increased: ${old_price:.2f} → ${new_price:.2f}")
                        st.write(f"Increase: {increase:.1f}%")
                        st.success(f"Recommended price: ${new_price * 1.3:.2f}")
                    else:
                        st.success(f"**{row['Product']}**: Price stable at ${new_price:.2f}")
                else:
                    st.info(f"**{row['Product']}**: New product")
            
            st.subheader("📈 Price History")
            conn = get_pricing_db()
            history_df = pd.read_sql_query("SELECT * FROM price_history ORDER BY date DESC", conn)
            conn.close()
            st.dataframe(history_df)
    
    with tab3:
        st.header("Add New Product")
        with st.form("add_product"):
            name = st.text_input("Product Name")
            category = st.selectbox("Category", ["Liquor", "Beer", "Wine", "Snacks", "Deli"])
            front = st.text_input("Front Location")
            back = st.text_input("Back Location")
            cost = st.number_input("Cost Price", min_value=0.0, value=10.0)
            
            if st.form_submit_button("Add Product"):
                if name and front and back:
                    conn = get_inventory_db()
                    cursor = conn.cursor()
                    cursor.execute('''
                        INSERT INTO products (name, category, front_location, back_location, current_stock, cost_price, selling_price)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    ''', (name, category, front, back, 0, cost, cost * 1.3))
                    conn.commit()
                    conn.close()
                    st.success(f"✅ Added {name} to inventory!")
                    st.balloons()

if __name__ == "__main__":
    main()
    