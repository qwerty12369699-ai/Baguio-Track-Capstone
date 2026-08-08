USE baguiotrack;

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM feedback_reports;
DELETE FROM tourist_spots;
DELETE FROM routes;
DELETE FROM terminals;
DELETE FROM users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO terminals (name, location, description, latitude, longitude, image_url)
SELECT 'Mines View Terminal', 'Mines View, Baguio', 'Main terminal serving Mines View Park, The Mansion, Wright Park, Botanical Garden, and Good Shepherd.', 16.41205, 120.59725, '../assets/images/minesviewterminal.jpeg'
WHERE NOT EXISTS (SELECT 1 FROM terminals WHERE name = 'Mines View Terminal');

INSERT INTO terminals (name, location, description, latitude, longitude, image_url)
SELECT 'Baguio Plaza Terminal', 'Baguio Plaza, Baguio', 'Main downtown terminal for Camp John Hay and Bell Church routes.', 16.41268, 120.59453, '../assets/images/baguiopterminal.jpeg'
WHERE NOT EXISTS (SELECT 1 FROM terminals WHERE name = 'Baguio Plaza Terminal');

INSERT INTO terminals (name, location, description, latitude, longitude, image_url)
SELECT 'Kayang Street Terminal', 'Kayang Street, Baguio', 'Terminal for Lourdes Grotto, Mirador, Diplomat Hotel, Tam-Awan Village, Igorot Stone Kingdom, and Dragon Treasure Castle.', 16.41475, 120.59507, '../assets/images/kayangterminal.jpeg'
WHERE NOT EXISTS (SELECT 1 FROM terminals WHERE name = 'Kayang Street Terminal');

INSERT INTO terminals (name, location, description, latitude, longitude, image_url)
SELECT 'Otek Street Terminal', 'Otek Street, Baguio', 'Terminal for the Otek / Camp 6 route to Lions Head.', 16.41133, 120.59197, '../assets/images/otekterminal.png'
WHERE NOT EXISTS (SELECT 1 FROM terminals WHERE name = 'Otek Street Terminal');
