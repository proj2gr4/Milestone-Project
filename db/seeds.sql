-- USER:
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("Fazle Ryan C", "ryan7998@gmail.com", "user1234", "uploads\\fazle.jpg");
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("test1", "test1@mail.com", "user1234", "");
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("test2", "test2@mail.com", "user1234", "uploads\\1593682294248.jpg");
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("test3", "test3@mail.com", "user1234", "uploads\\1593682294248.jpg");
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("Curtis", "cj1988333@hotmail.com", "PizzaMan", "uploads\\e66b795e-ff3f-4ad1-8111-19121bc01b0b.jpg");
INSERT INTO `user` (`username`,`email`,`password`,`profile_img`) VALUES ("Lernantino", "lernantino@gmail.com", "password1234", "uploads\\54726f87-2ded-4501-aae4-01c3a98bb0de.jpg");
-- Categories:
INSERT INTO `categories` (`category_name`, `img_url`, `created_at`, `updated_at`) VALUES ("Fitness", "/images/img3.jpg", "2021-03-19", "2021-03-19");
INSERT INTO `categories` (`category_name`, `img_url`, `created_at`, `updated_at`) VALUES ("Health", "/images/img4.jpg", "2021-03-19", "2021-03-19");
INSERT INTO `categories` (`category_name`, `img_url`, `created_at`, `updated_at`) VALUES ("Education", "/images/img2.jpg", "2021-03-19", "2021-03-19");

-- Goal:
INSERT INTO `goal` (`title`,`user_id`,`description`,`category_id`,`subcategory`,`due_date`,`status`,`created_at`,`updated_at`) VALUES ("Loose 7kg", 1, "Loose 7 kg in three month by weight training and cardio", 1, "Strength Training", "2021-05-19", "started", "2021-03-19", "2021-03-19");
INSERT INTO `goal` (`title`,`user_id`,`description`,`category_id`,`subcategory`,`due_date`,`status`,`created_at`,`updated_at`) VALUES ("Run 100 km", 2, "Run 100 km in one month", 2, "Cardio", "2021-05-19", "started", "2021-03-19", "2021-03-19");
INSERT INTO `goal` (`title`,`user_id`,`description`,`category_id`,`subcategory`,`due_date`,`status`,`created_at`,`updated_at`) VALUES ("Gain 1 kg", 3, "Gain 1 kg lean muscle mass in 1 month", 1, "weight training", "2021-05-19", "started", "2021-03-19", "2021-03-19");

-- Member_Goal:
INSERT INTO `member_goal` (`user_id`,`goal_id`,`status`,`created_at`,`updated_at`) VALUES (2, 1, "started", "2021-03-19", "2021-03-19");
INSERT INTO `member_goal` (`user_id`,`goal_id`,`status`,`created_at`,`updated_at`) VALUES (3, 1, "started", "2021-03-19", "2021-03-19");
INSERT INTO `member_goal` (`user_id`,`goal_id`,`status`,`created_at`,`updated_at`) VALUES (4, 1, "started", "2021-03-19", "2021-03-19");
INSERT INTO `member_goal` (`user_id`,`goal_id`,`status`,`created_at`,`updated_at`) VALUES (2, 3, "started", "2021-03-19", "2021-03-19");

-- Step:
INSERT INTO `step` (`title`,`goal_id`, `description`, `start_date`,`due_date`,`created_at`,`updated_at`) VALUES ("Loose 2 kg first", 1, "Loose 2 kg in first two month by dieting", "2021-04-01", "2021-06-01", "2021-03-19", "2021-03-19");
INSERT INTO `step` (`title`,`goal_id`,`description`,`start_date`,`due_date`,`created_at`,`updated_at`) VALUES ("Loose 2 kg second", 1, "Loose 2 kg in second two month by dieting and Cardio", "2021-06-01", "2021-08-01", "2021-03-19", "2021-03-19");
INSERT INTO `step` (`title`,`goal_id`,`description`,`start_date`,`due_date`,`created_at`,`updated_at`) VALUES ("Loose 3 kg finally", 1, "Loose 3 kg in final two month by dieting and Cardio", "2021-08-01", "2021-10-01", "2021-03-19", "2021-03-19");

INSERT INTO `step` (`title`,`goal_id`,`description`,`start_date`,`due_date`,`created_at`,`updated_at`) VALUES ("Finish 40 km in first 15 days", 2, "Finish 40 km in first 15 days by increasing limits gradually", "2021-04-01", "2021-04-15", "2021-03-19", "2021-03-19");
INSERT INTO `step` (`title`,`goal_id`,`description`,`start_date`,`due_date`,`created_at`,`updated_at`) VALUES ("Finish 60 km in final 15 days", 2, "Finish 60 km in last 15 days", "2021-04-16", "2021-04-30", "2021-03-19", "2021-03-19");

-- User_Step:
INSERT INTO `user_step` (`step_id`,`user_id`,`status`,`img_url`,`created_at`,`updated_at`) VALUES (1,2,"started",null,"2021-03-19","2021-03-19");
INSERT INTO `user_step` (`step_id`,`user_id`,`status`,`img_url`,`created_at`,`updated_at`) VALUES (2,2,"started",null,"2021-03-19","2021-03-19");
INSERT INTO `user_step` (`step_id`,`user_id`,`status`,`img_url`,`created_at`,`updated_at`) VALUES (3,2,"started",null,"2021-03-19","2021-03-19");

INSERT INTO `user_step` (`step_id`,`user_id`,`status`,`img_url`,`created_at`,`updated_at`) VALUES (4,2,"started",null,"2021-03-19","2021-03-19");
INSERT INTO `user_step` (`step_id`,`user_id`,`status`,`img_url`,`created_at`,`updated_at`) VALUES (5,2,"started",null,"2021-03-19","2021-03-19");

-- Comments:
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (1,1,"This goal should be tough ","2021-03-19","2021-03-19");
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (1,2,"This goal should be tough 2","2021-03-19","2021-03-19");
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (1,3,"This goal should be tough 3","2021-03-19","2021-03-19");
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (2,1,"This goal should be tough 4","2021-03-19","2021-03-19");
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (2,2,"This goal should be tough 5","2021-03-19","2021-03-19");
INSERT INTO `comment` (`user_id`,`goal_id`,`comment`,`created_at`,`updated_at`) VALUES (2,3,"This goal should be tough 6","2021-03-19","2021-03-19");