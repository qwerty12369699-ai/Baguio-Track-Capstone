-- Seed file for Baguio Track
-- Inserts sample data for terminals, tourist_spots, routes, and feedback_reports

SET FOREIGN_KEY_CHECKS = 0;

-- Terminals
INSERT INTO `terminals` (`id`, `name`, `latitude`, `longitude`, `description`, `created_at`) VALUES
(1, 'Mines View Terminal', 16.41205, 120.59725, 'Mines View area terminal serving Mines View Park and nearby attractions.', NOW()),
(2, 'Baguio Plaza Terminal', 16.41268, 120.59453, 'Baguio Plaza terminal serving Camp John Hay and nearby routes.', NOW()),
(3, 'Kayang Street Terminal', 16.41475, 120.59507, 'Kayang Street terminal giving access to Mirador and Tam-Awan areas.', NOW()),
(4, 'Otek Street Terminal', 16.41133, 120.59197, 'Terminal near Otek Street serving Kennon Road directions.', NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Tourist spots (based on site DEFAULT_SPOTS)
INSERT INTO `tourist_spots` (`name`,`categories`,`page`,`image_url`,`location`,`description`,`terminal_id`,`route_id`,`walk`,`walk_time`,`return_trip`,`note`,`latitude`,`longitude`,`archived`,`created_at`) VALUES
('Mirador Heritage And Eco Park', '"Nature","Park"','mirador.html','https://i.pinimg.com/736x/11/50/aa/1150aa2cd209123f65ae4af4bb5911f9.jpg','Mirador Hill, Baguio City','A popular spot for tourists and locals alike, who come to enjoy the stunning views of Baguio City and the surrounding mountains and is also home to a bamboo grove, rock formations, and more.',3,NULL,'Short uphill approach','10 mins','Return via Mirador Road','Great viewpoint for sunrise.','16.4101478','120.5786349',0,NOW()),
('Botanical Garden', '"Nature","Park"','botanical.html','../assets/images/botanicalgarden.jpg','Leonard Wood Road, Baguio City','A peaceful botanical sanctuary with towering pines, flower gardens, and cultural sculptures perfect for relaxing walks and photo spots.',1,NULL,'Short walk from drop-off','5 mins','Return to main road','Family-friendly gardens and picnic areas.','16.4150','120.6130',0,NOW()),
('Mines View Park', '"Park","Landmark"','minesview.html','../assets/images/minesviewpark.jpg','Mines View Road, Baguio City','A popular viewpoint offering sweeping mountain vistas, historic mining landscapes, and shops selling local crafts and treats.',1,NULL,'Very short walk to viewing deck','3 mins','Return via Mines View jeep','Busy on weekends; expect vendors.','16.4197','120.6274',0,NOW()),
('The Mansion', '"Landmark"','mansion.html','../assets/images/mansion.jpg','Leonard Wood Road, Baguio City','The official summer residence of the Philippine President, known for its grand gate, manicured lawns, and historical significance.',1,NULL,'Short walk from roadside','5 mins','Return via main gate','Historic site; respect grounds.','16.4128927','120.6199063',0,NOW()),
('Camp John Hay', '"Nature","Park","Landmark"','johnhay.html','../assets/images/camp.jpg','Loakan Road, Baguio City','A historic leisure complex with pine forests, trails, cafés, and heritage sites perfect for outdoor exploration.',2,NULL,'Short walk to park entrance','8 mins','Return via Plaza-bound jeep','Good for walking trails and picnics.','16.397029','120.611360',0,NOW()),
('Lourdes Grotto', '"Landmark","Culture"','grotto.html','../assets/images/grotto.jpg','Dominican Hill Road, Mirador Hill, Baguio City','A beloved pilgrimage site featuring the Virgin Mary statue atop 252 steps and panoramic city views for reflective moments.',3,NULL,'Uphill walk/steps','15-20 mins','Descent back to road','Steep climb; wear comfortable shoes.','16.40999','120.58088',0,NOW()),
('Good Shepherd Convent', '"Culture"','goodshepherd.html','https://i.pinimg.com/1200x/18/a5/28/18a5289c26005e8d1480cb4aef29950b.jpg','15 Gibraltar Road, Mines View, Baguio City','Famous for ube jam and local pasalubong, this convent is a scenic stop for shopping, snacks, and quiet reflection.',1,NULL,'Short walk from plaza','5 mins','Return via Mines View jeep','Popular for pasalubong shopping.','16.42233','120.62613',0,NOW()),
('Lions Head', '"Landmark"','lionshead.html','../assets/images/lion.webp','Kennon Road, near Barangay Calasungay, Tuba, Benguet','The Lion\'s Head along Kennon Road is a famous roadside landmark in Benguet, Philippines, carved into the mountainside.',4,NULL,'Roadside viewpoint, short approach','5-10 mins','Depends on route','Iconic roadside landmark on Kennon Road.','16.367','120.606',0,NOW()),
('Diplomat Hotel', '"Landmark","Culture"','diplomat.html','https://i.pinimg.com/1200x/90/ad/e5/90ade57f70358c88c020cb78fd4d4b00.jpg','Dominican Hill, Diplomat Road, Baguio','This hotel holds a lot of history, from being a seminary to a hotel, and now a popular tourist attraction known for its architecture and ghost stories.',3,NULL,'Uphill approach','12 mins','Return via Dominican Hill','Historic ruins and photo spot.','16.404','120.587',0,NOW()),
('Wright Park', '"Park","Landmark"','wrightpark.html','https://i.pinimg.com/1200x/9e/a1/9d/9ea19da330f29c25a4f5f920f46e466d.jpg','The Mansion, Romulo Dr, Baguio, Benguet','The park is a favorite spot for tourists and locals to enjoy leisurely walks, take photos, and experience the cool mountain air.',1,NULL,'Short walk from The Mansion','5 mins','Return to main road','Horses available near the pond area.','16.415','120.617',0,NOW()),
('Igorot Stone Kingdom', '"Landmark","Culture"','igorot.html','https://i.pinimg.com/736x/f2/48/81/f248816e6f5950cb5ab481af89c95e5d.jpg','Long Long Road, Pinsao Proper, Baguio City','The park celebrates Igorot culture through the traditional riprap stone-laying technique, which involves stacking stones without cement.',3,NULL,'Short roadside stop','4-6 mins','Return to main route','Cultural displays and stonework exhibits.','16.432','120.575',0,NOW()),
('Dragon Treasure Castle', '"Landmark","Culture"','dragon.html','https://lakbaypinas.com/wp-content/uploads/2025/02/471333542_122116129676614614_476453595541820013_n-1536x864.jpg','Block 8, Irisville Subdivision, Baguio City, Benguet','Dragon Treasure Castle is worth visiting if you want dramatic photos, fantasy-style architecture, and a short Baguio side trip.',3,NULL,'Steeper approach','15 mins','Return via Kayang routes','Fantasy-style architecture and photo ops.','16.422','120.566',0,NOW()),
('Tam-Awan Village', '"Culture"','tamawan.html','https://i.pinimg.com/1200x/35/67/2c/35672c91f7f83f36499f5117c76f78d1.jpg','Long Long Benguet Rd, Baguio City, Benguet','Tam-Awan Village holds its true values and culture of the Cordilleran heritage.',3,NULL,'Short walk from roadside','6-10 mins','Return via Kayang route','Heritage village with artist workshops.','16.42997','120.57663',0,NOW()),
('Bell Church', '"Landmark","Culture"','bellchurch.html','https://i.pinimg.com/736x/33/45/08/334508be47f39d2f03b6ba791a11a97e.jpg','Bell Church Rd, La Trinidad, Benguet','Bell Church is a Chinese temple known for its colorful architecture, serene gardens, and cultural significance.',2,NULL,'Short walk from drop-off','5 mins','Return to Plaza','Colorful temple and peaceful gardens.','16.431541','120.598391',0,NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Routes (simple commute guide rows linked to terminals)
INSERT INTO `routes` (`terminal_id`,`name`,`board`,`dropoff`,`route`,`walk`,`walk_time`,`return_trip`,`fare`,`note`,`created_at`) VALUES
(1,'Mines View → Botanical Garden','Mines View Terminal','Botanical Garden','Mines View route','Short walk','5 mins','Return to Mines View plaza','', 'Follow signs to the garden entrance', NOW()),
(1,'Mines View → Mines View Park','Mines View Terminal','Mines View Park','Mines View route','Very short walk','3 mins','Return to Mines View plaza','', 'Popular viewpoint; expect vendors', NOW()),
(2,'Plaza → Camp John Hay','Baguio Plaza Terminal','Camp John Hay','Plaza route','Short walk','8 mins','Return to Plaza','', 'Follows Scout Barrio / Plaza route', NOW()),
(3,'Kayang → Mirador Heritage','Kayang Street Terminal','Mirador Heritage And Eco Park','Kayang route','Uphill walk','10-15 mins','Return via Mirador Road','', 'Final uphill approach to Mirador', NOW()),
(4,'Otek → Lions Head','Otek Street Terminal','Lions Head','Kennon Road route','Short approach','5-10 mins','Depends on route','', 'Roadside stop near Kennon Road', NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sample feedback reports
INSERT INTO `feedback_reports` (`user_email`,`subject`,`message`,`status`,`created_at`) VALUES
('jane.doe@example.com','Great guide!','Loved the route tips for Mines View Park. Very helpful!', 'new', NOW()),
('mark.traveler@example.com','Accessibility note','Some paths in Mirador are steep; please add accessibility notes.', 'new', NOW()),
('tourist123@example.com','Missing info','Is there an entrance fee for Camp John Hay?', 'new', NOW());

SET FOREIGN_KEY_CHECKS = 1;

-- End of seed file
