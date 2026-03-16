-- создаем demo пользователя
INSERT INTO users (email, password)
VALUES ('demo@mail.com', '123456')
ON CONFLICT (email) DO NOTHING;

-- создаем задачи для demo пользователя
INSERT INTO tasks (title, status, user_id)
SELECT 
  'First task', 
  'todo', 
  id
FROM users
WHERE email = 'demo@mail.com'
ON CONFLICT DO NOTHING;

INSERT INTO tasks (title, status, user_id)
SELECT 
  'Second task', 
  'in_progress', 
  id
FROM users
WHERE email = 'demo@mail.com'
ON CONFLICT DO NOTHING;

INSERT INTO tasks (title, status, user_id)
SELECT 
  'Completed task', 
  'done', 
  id
FROM users
WHERE email = 'demo@mail.com'
ON CONFLICT DO NOTHING;