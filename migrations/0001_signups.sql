create table if not exists signups (
  id integer primary key autoincrement,
  type text default 'alert',
  email text not null,
  name text,
  organization text,
  interest text,
  message text,
  link text,
  created_at text default (datetime('now'))
);
