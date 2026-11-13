CREATE TABLE IF NOT EXISTS comments (id TEXT PRIMARY KEY, page TEXT NOT NULL, name TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, parent_id TEXT REFERENCES comments(id));
CREATE INDEX IF NOT EXISTS comments_page_time ON comments(page, created_at);
CREATE INDEX IF NOT EXISTS comments_parent ON comments(parent_id);
CREATE TABLE IF NOT EXISTS votes (comment_id TEXT NOT NULL REFERENCES comments(id), voter TEXT NOT NULL, value INTEGER NOT NULL CHECK(value IN (-1,1)), PRIMARY KEY(comment_id,voter));
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
