-- created the table with id, task and whether it was completed or not
CREATE TABLE to_do_list (
	id SERIAL PRIMARY KEY,
	task text,
	completed boolean
);

--added test task
INSERT INTO to_do_list(task, completed)
VALUES ('Get my Weekend Challange Done', false);
