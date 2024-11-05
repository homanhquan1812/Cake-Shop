-- Users' Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins' Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products' Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    photo VARCHAR(255),
    price INTEGER NOT NULL
);

-- Users' Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    status BOOLEAN DEFAULT FALSE,  -- Added status column with default value
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (id, name, description, price, photo) VALUES
(gen_random_uuid(), 'Chocolate Cake', 'A rich and moist chocolate cake, perfect for chocolate lovers.', 20000, 'https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-index-64b83bce2df26.jpg?crop=0.6668359143606668xw:1xh;center,top&resize=1200:*'),
(gen_random_uuid(), 'Vanilla Sponge Cake', 'A light and fluffy vanilla sponge cake, great for any occasion.', 18000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDfgNzFFHbtHa9jrc9wKTU2g5S1qtWcUZrBA&s'),
(gen_random_uuid(), 'Red Velvet Cake', 'A striking red cake with a hint of cocoa and cream cheese frosting.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUiAAAPTcSQ3spCfhJGZe5smy-RmTFilrPg&s'),
(gen_random_uuid(), 'Cheesecake', 'A creamy cheesecake with a graham cracker crust, deliciously rich.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHvphcQhNRkaFlUZzNcFLXxJAmnmlJqF5mw&s'),
(gen_random_uuid(), 'Carrot Cake', 'A moist cake filled with grated carrots, topped with cream cheese icing.', 23000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJdc3neHlLPrfDoW3ARDcDYjzm9OacfTnlA&s'),
(gen_random_uuid(), 'Lemon Drizzle Cake', 'A zesty lemon cake with a sweet and tangy drizzle on top.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV-lbR8cZ9wAweGisEO394fkXAd47KMsvew&s'),
(gen_random_uuid(), 'Pineapple Upside-Down Cake', 'A classic cake topped with caramelized pineapple and cherries.', 20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-7uHJLbZITVWwPQPb61okJ4ib2CrcCyTxw&s'),
(gen_random_uuid(), 'Angel Food Cake', 'A light and airy cake made with whipped egg whites and no fat.', 19000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP3lMMYNGVV9uklDjbShAOWUAKAXKJ_NaDUQ&s'),
(gen_random_uuid(), 'Devil’s Food Cake', 'A rich and dark chocolate cake, perfect for dessert lovers.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpX_HPZjlLOSiQjVQ9oLN1xTM8tMyBuvxcA&s'),
(gen_random_uuid(), 'Black Forest Cake', 'A chocolate sponge cake layered with cherries and whipped cream.', 26000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBElWN0XSk-RXUHKkjKuaHssB-KESae637w&s'),
(gen_random_uuid(), 'Opera Cake', 'A luxurious cake with layers of almond sponge, coffee buttercream, and chocolate.', 30000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGVAVHPgVy_-Cqir7Ko7VWNIu-u2oihp9Lw&s'),
(gen_random_uuid(), 'Funfetti Cake', 'A festive vanilla cake filled with colorful sprinkles.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMtq9JtGwtYL0dxN3DiH4GMdh2KLRoGFBJCA&s'),
(gen_random_uuid(), 'Marble Cake', 'A combination of chocolate and vanilla cake swirled together.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1fZRXFWJCUfm75151pDeHX1ZqC1HbB-NpHw&s'),
(gen_random_uuid(), 'Coconut Cake', 'A moist cake filled with coconut and topped with fluffy frosting.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusEAYOybCthVUxzM8YxZyZIGI9oKAbx45fA&s'),
(gen_random_uuid(), 'Fruitcake', 'A rich cake filled with candied fruits and nuts, often served during holidays.', 28000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIe0x3WKa8fL2OSNMaQnli_PaCERpFHWdQw&s'),
(gen_random_uuid(), 'Tiramisu', 'An Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.', 29000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsXtWWFgeyfYwnT1NN6IyYIwpcUSVYGt6Xg&s'),
(gen_random_uuid(), 'Coffee Cake', 'A moist cake flavored with coffee, often topped with a crumbly streusel.', 23000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCHS1S3jh0B4nv1Fp0RNmydP5F57C4nAqCw&s'),
(gen_random_uuid(), 'Banana Cake', 'A soft and moist cake made with ripe bananas.', 20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkLrn8S56P5Dkpht6JaSZRXOKd77MXfF0Img&s'),
(gen_random_uuid(), 'Boston Cream Pie', 'A layered cake with custard filling and chocolate frosting on top.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooyl0AZn17wdkuiLQye8jnp_CtxuQhNIC3Q&s'),
(gen_random_uuid(), 'Molten Lava Cake', 'A decadent chocolate cake with a gooey, molten center.', 27000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhk9XuUae5YlhHyZ55t3SkCOBC9RsqaEDguA&s'),
(gen_random_uuid(), 'Flourless Chocolate Cake', 'A rich and dense chocolate cake made without flour.', 28000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OpUfeV1OSAuKXKYqItDZ-Qg_L5iyCxKvqw&s'),
(gen_random_uuid(), 'Genoise Cake', 'An Italian sponge cake that is light and airy, often used in layered desserts.', 23000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpYsAOGYdN8LxxGRjUTZ-w9eKGjyNuPD0Tg&s'),
(gen_random_uuid(), 'Tres Leches Cake', 'A moist cake soaked in three kinds of milk for a rich flavor.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7cb7x3kNRWzFVkEp0G1uI-ZGrbL7DkuQIA&s'),
(gen_random_uuid(), 'Chiffon Cake', 'A light and fluffy cake made with oil and egg whites, often flavored with citrus.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr_8IOTNKh97zRsIugvVMRHbwmNsRmUp5NsA&s'),
(gen_random_uuid(), 'Sponge Roll Cake (Swiss Roll)', 'A rolled cake made with sponge cake and filled with cream or jam.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTPmwfsaly6IboTosfqkteFX3xqlOeGLSdg&s'),
(gen_random_uuid(), 'Pumpkin Cake', 'A moist and spiced cake made with pumpkin puree.', 20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNg3th-F_jz3MmzNlB01y5EguPSskMpN8k_A&s'),
(gen_random_uuid(), 'Matcha Green Tea Cake', 'A unique cake flavored with matcha green tea for a delicious taste.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9RTneGu4RX8AxV98N9BicLM4xE3oRtxYrw&s'),
(gen_random_uuid(), 'Pound Cake', 'A dense and buttery cake that is perfect for slicing and serving.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaQANzHc_DgKN-DmHav-7EYMmOn3l_KrPRvw&s'),
(gen_random_uuid(), 'Ricotta Cake', 'A rich and creamy cake made with ricotta cheese.', 23000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBH4b6IvPyTLZ8d3fvLPh4bf7m11Dtc-WoKw&s'),
(gen_random_uuid(), 'Yule Log (Bûche de Noël)', 'A traditional Christmas cake made to look like a log, filled with chocolate.', 30000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26t0ldaHBy6i-QgnecbobmZA7D66MVKbbGw&s'),
(gen_random_uuid(), 'Butter Cake', 'A moist and buttery cake that is perfect for any dessert table.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBuoocaPy7XiTYTZ5tohjbmH0C1bZkzZiP1Q&s'),
(gen_random_uuid(), 'Sacher Torte', 'A rich chocolate cake with a layer of apricot jam and dark chocolate icing.', 29000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTSqgW8bof_ctNvfDMxlwLWxnK3mnZcVPQtg&s'),
(gen_random_uuid(), 'Cassata', 'A traditional Italian cake made with ricotta and candied fruits.', 26000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_-H0ngQoJlM8vAPL3T4Eesx5DO_vZ6Fkcw&s'),
(gen_random_uuid(), 'Hummingbird Cake', 'A southern cake made with banana, pineapple, and pecans.', 27000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ONJgCgjWSroPwu-Pz9TTh_vnyFRUHL7akw&s'),
(gen_random_uuid(), 'Zebra Cake', 'A fun cake with alternating layers of chocolate and vanilla batter.', 23000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Ky5YFbHcBaYIhaeE4jxVGZ98plFQ3UxJtg&s'),
(gen_random_uuid(), 'Olive Oil Cake', 'A moist cake made with olive oil, giving it a unique flavor.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThiELZjroxDjzTLcX_S2NSaUGJyFJaXupoRQ&s'),
(gen_random_uuid(), 'Rocky Road Cake', 'A chocolate cake filled with marshmallows and nuts.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxUTUC8-rGY7Gy2gUrTkSwDghzz1cv6PbWw&s'),
(gen_random_uuid(), 'Victoria Sponge', 'A light sponge cake filled with jam and whipped cream.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_nBC920n-2He4kbQ9GIDbkwXNMkDhLt5Rg&s'),
(gen_random_uuid(), 'Mousse Cake', 'A light and airy dessert made with chocolate mousse.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQviH4CjXP_z5V2zZRxzCITgUWiMfQzTrBKzA&s'),
(gen_random_uuid(), 'Ice Cream Cake', 'A cake made with layers of ice cream and cake, perfect for summer.', 30000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQunsfd_g5BML_t3xpzpSO5afMdXsUMb4XygA&s'),
(gen_random_uuid(), 'Pavlova', 'A meringue-based dessert topped with whipped cream and fruit.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbnpWqwaT-foLvypxMtOmUmRDp0Vxppdt4HQ&s'),
(gen_random_uuid(), 'Chocolate Truffle Cake', 'A rich and indulgent cake made with chocolate truffles.', 29000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDoBwcC3Tgqwo-LXsNb7WJMhV6fKwBl7MGA&s'),
(gen_random_uuid(), 'Japanese Strawberry Shortcake', 'A light and fluffy cake topped with fresh strawberries and whipped cream.', 25000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uMggp04tbyG1MvbiCmEWxSez8_sN3RZ-Ww&s'),
(gen_random_uuid(), 'Almond Cake', 'A moist cake flavored with almond extract and topped with slivered almonds.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRZPRoop2uAWu_Mc13leJ4rB6nS5Ykw2x4w&s'),
(gen_random_uuid(), 'Dobos Torte', 'A Hungarian cake with layers of sponge cake and chocolate buttercream.', 27000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij4CdpFtI78KRUkk-ytPOKtc5YdoCOfj0HA&s'),
(gen_random_uuid(), 'Italian Cream Cake', 'A rich cake made with coconut and pecans, topped with cream cheese frosting.', 29000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNP4_-dO0a49Sxpi1QP4MziBLTwfuGuKuvA&s'),
(gen_random_uuid(), 'Battenberg Cake', 'A checkerboard cake wrapped in marzipan, a true classic.', 26000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcisDYSgq05_TrPkULlB_M4DcBBXstympfFw&s'),
(gen_random_uuid(), 'Madeira Cake', 'A dense, buttery cake often served with tea.', 22000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYU2qy2iu16OPfXXow6it2gniiIfBvkQkEZQ&s'),
(gen_random_uuid(), 'Spice Cake', 'A flavorful cake spiced with cinnamon, nutmeg, and cloves.', 21000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCj3jfVUuHy62AOHt9dnjAEm0-81MNu5-eg&s'),
(gen_random_uuid(), 'Black Sesame Cake', 'A unique cake made with black sesame paste for a nutty flavor.', 24000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzodstZIkVMbNUWQxALA5fmwEPiwuO63teg&s');