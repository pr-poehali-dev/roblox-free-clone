CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    robux BIGINT DEFAULT 1000,
    level INTEGER DEFAULT 1,
    daily_streak INTEGER DEFAULT 0,
    privilege VARCHAR(50),
    clan VARCHAR(255),
    selected_avatar_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_robux_earned BIGINT DEFAULT 0,
    total_games_played INTEGER DEFAULT 0,
    total_items_bought INTEGER DEFAULT 0,
    total_cases_opened INTEGER DEFAULT 0,
    crash_games_won INTEGER DEFAULT 0,
    crash_games_lost INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(10),
    members_count INTEGER DEFAULT 0,
    power INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    reward_amount BIGINT NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_stats (
    id SERIAL PRIMARY KEY,
    total_users INTEGER DEFAULT 0,
    total_robux_distributed BIGINT DEFAULT 0,
    total_games_played INTEGER DEFAULT 0,
    active_users_today INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO site_stats (total_users, total_robux_distributed, total_games_played, active_users_today) 
VALUES (0, 0, 0, 0);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX idx_daily_rewards_user_id ON daily_rewards(user_id);