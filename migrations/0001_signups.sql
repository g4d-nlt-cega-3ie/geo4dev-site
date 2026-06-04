create table if not exists signups (
  id integer primary key autoincrement,
  email text not null,
  name text,
  organization text,
  interest text,
  message text,
  created_at text default (datetime('now'))
);
