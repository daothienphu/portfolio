ALTER TABLE comments ADD COLUMN parent_id TEXT REFERENCES comments(id);
CREATE TABLE IF NOT EXISTS votes (comment_id TEXT NOT NULL REFERENCES comments(id), voter TEXT NOT NULL, value INTEGER NOT NULL CHECK(value IN (-1,1)), PRIMARY KEY(comment_id,voter));
CREATE INDEX IF NOT EXISTS comments_parent ON comments(parent_id);
