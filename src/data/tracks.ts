export type Difficulty = "easy" | "medium" | "hard";

export type Track = {
  id: string;
  band: string;
  title: string;
  year: number;
  subgenre: string;
  youtubeId: string;
  difficulty: Difficulty;
};

export const DIFFICULTY_LABELS: Record<Difficulty, { name: string; blurb: string }> = {
  easy: { name: "Easy", blurb: "Classic Rock & Nu-Metal anthems" },
  medium: { name: "Medium", blurb: "Hard Rock, Heavy Metal & Grunge" },
  hard: { name: "Hard", blurb: "Thrash, Death Metal & Prog" },
};

export const TRACKS: Track[] = [
  // ---------- EASY: classic rock + nu-metal ----------
  { id: "e1", band: "AC/DC", title: "Back in Black", year: 1980, subgenre: "Hard Rock", youtubeId: "pAgnJDJN4VA", difficulty: "easy" },
  { id: "e2", band: "Guns N' Roses", title: "Sweet Child O' Mine", year: 1987, subgenre: "Hard Rock", youtubeId: "1w7OgIMMRc4", difficulty: "easy" },
  { id: "e3", band: "Queen", title: "Bohemian Rhapsody", year: 1975, subgenre: "Classic Rock", youtubeId: "fJ9rUzIMcZQ", difficulty: "easy" },
  { id: "e4", band: "Linkin Park", title: "In the End", year: 2000, subgenre: "Nu-Metal", youtubeId: "eVTXPUF4Oz4", difficulty: "easy" },
  { id: "e5", band: "Linkin Park", title: "Numb", year: 2003, subgenre: "Nu-Metal", youtubeId: "kXYiU_JCYtU", difficulty: "easy" },
  { id: "e6", band: "Led Zeppelin", title: "Immigrant Song", year: 1970, subgenre: "Classic Rock", youtubeId: "y8OtzJtp-EM", difficulty: "easy" },
  { id: "e7", band: "Deep Purple", title: "Smoke on the Water", year: 1972, subgenre: "Classic Rock", youtubeId: "zUwEIt9ez7M", difficulty: "easy" },
  { id: "e8", band: "Pink Floyd", title: "Another Brick in the Wall", year: 1979, subgenre: "Progressive Rock", youtubeId: "YR5ApYxkU-U", difficulty: "easy" },
  { id: "e9", band: "Bon Jovi", title: "Livin' on a Prayer", year: 1986, subgenre: "Glam Rock", youtubeId: "lDK9QqIzhwk", difficulty: "easy" },
  { id: "e10", band: "Aerosmith", title: "Dream On", year: 1973, subgenre: "Classic Rock", youtubeId: "89dGC8de0CA", difficulty: "easy" },
  { id: "e11", band: "Korn", title: "Freak on a Leash", year: 1998, subgenre: "Nu-Metal", youtubeId: "jRGrNDV2mKc", difficulty: "easy" },
  { id: "e12", band: "Slipknot", title: "Duality", year: 2004, subgenre: "Nu-Metal", youtubeId: "6fVE8kSM43I", difficulty: "easy" },
  { id: "e13", band: "System of a Down", title: "Chop Suey!", year: 2001, subgenre: "Nu-Metal", youtubeId: "CSvFpBOe8eY", difficulty: "easy" },
  { id: "e14", band: "Limp Bizkit", title: "Rollin'", year: 2000, subgenre: "Nu-Metal", youtubeId: "ONp3AqrPmYw", difficulty: "easy" },
  { id: "e15", band: "Papa Roach", title: "Last Resort", year: 2000, subgenre: "Nu-Metal", youtubeId: "5Y3ELc-8bcA", difficulty: "easy" },
  { id: "e16", band: "Evanescence", title: "Bring Me to Life", year: 2003, subgenre: "Nu-Metal", youtubeId: "3YxaaGgTQYM", difficulty: "easy" },
  { id: "e17", band: "Disturbed", title: "Down with the Sickness", year: 2000, subgenre: "Nu-Metal", youtubeId: "09LTT0xwdfw", difficulty: "easy" },
  { id: "e18", band: "The Rolling Stones", title: "Paint It, Black", year: 1966, subgenre: "Classic Rock", youtubeId: "O4irXQhgMqg", difficulty: "easy" },
  { id: "e19", band: "Green Day", title: "Basket Case", year: 1994, subgenre: "Punk Rock", youtubeId: "NUTGr5t3MoY", difficulty: "easy" },
  { id: "e20", band: "Foo Fighters", title: "Everlong", year: 1997, subgenre: "Alternative Rock", youtubeId: "eBG7P-K-r1Y", difficulty: "easy" },
  { id: "e21", band: "Red Hot Chili Peppers", title: "Californication", year: 1999, subgenre: "Alternative Rock", youtubeId: "YlUKcNNmywk", difficulty: "easy" },
  { id: "e22", band: "Rage Against the Machine", title: "Killing in the Name", year: 1992, subgenre: "Rap Metal", youtubeId: "bWXazVhlyxQ", difficulty: "easy" },
  { id: "e23", band: "Nickelback", title: "How You Remind Me", year: 2001, subgenre: "Post-Grunge", youtubeId: "OSUxrSe5GbI", difficulty: "easy" },
  { id: "e24", band: "Van Halen", title: "Jump", year: 1983, subgenre: "Hard Rock", youtubeId: "SwYN7mTi6HM", difficulty: "easy" },
  { id: "e25", band: "Kiss", title: "Rock and Roll All Nite", year: 1975, subgenre: "Glam Rock", youtubeId: "0uMkr3eZ4Kw", difficulty: "easy" },
  { id: "e26", band: "The Who", title: "Baba O'Riley", year: 1971, subgenre: "Classic Rock", youtubeId: "PdYJs0mSvVw", difficulty: "easy" },
  { id: "e27", band: "Creedence Clearwater Revival", title: "Fortunate Son", year: 1969, subgenre: "Classic Rock", youtubeId: "ZWijx_AgPiA", difficulty: "easy" },
  { id: "e28", band: "Blink-182", title: "All the Small Things", year: 1999, subgenre: "Punk Rock", youtubeId: "9Ht5RZpzPqw", difficulty: "easy" },
  { id: "e29", band: "Three Days Grace", title: "Animal I Have Become", year: 2006, subgenre: "Post-Grunge", youtubeId: "loLNIIhwvBI", difficulty: "easy" },
  { id: "e30", band: "My Chemical Romance", title: "Welcome to the Black Parade", year: 2006, subgenre: "Emo Rock", youtubeId: "MQtnyEUsFwc", difficulty: "easy" },

  // ---------- MEDIUM: hard rock + heavy metal + grunge ----------
  { id: "m1", band: "Metallica", title: "Enter Sandman", year: 1991, subgenre: "Heavy Metal", youtubeId: "CD-E-LDc384", difficulty: "medium" },
  { id: "m2", band: "Black Sabbath", title: "Paranoid", year: 1970, subgenre: "Heavy Metal", youtubeId: "0qanF-91aJo", difficulty: "medium" },
  { id: "m3", band: "Iron Maiden", title: "The Trooper", year: 1983, subgenre: "Heavy Metal", youtubeId: "X4bgXH3sJ2Q", difficulty: "medium" },
  { id: "m4", band: "Judas Priest", title: "Breaking the Law", year: 1980, subgenre: "Heavy Metal", youtubeId: "L397TWLwrUU", difficulty: "medium" },
  { id: "m5", band: "Nirvana", title: "Smells Like Teen Spirit", year: 1991, subgenre: "Grunge", youtubeId: "hTWKbfoikeg", difficulty: "medium" },
  { id: "m6", band: "Soundgarden", title: "Black Hole Sun", year: 1994, subgenre: "Grunge", youtubeId: "3mbBbFH9fAg", difficulty: "medium" },
  { id: "m7", band: "Alice in Chains", title: "Man in the Box", year: 1990, subgenre: "Grunge", youtubeId: "TAqZb52sgpU", difficulty: "medium" },
  { id: "m8", band: "Pearl Jam", title: "Alive", year: 1991, subgenre: "Grunge", youtubeId: "qM0zsBfM4bA", difficulty: "medium" },
  { id: "m9", band: "Stone Temple Pilots", title: "Plush", year: 1992, subgenre: "Grunge", youtubeId: "0BNSFrsuXBg", difficulty: "medium" },
  { id: "m10", band: "Scorpions", title: "Rock You Like a Hurricane", year: 1984, subgenre: "Hard Rock", youtubeId: "8oIT4dkJcFY", difficulty: "medium" },
  { id: "m11", band: "Ozzy Osbourne", title: "Crazy Train", year: 1980, subgenre: "Heavy Metal", youtubeId: "vy1V9d5aWpw", difficulty: "medium" },
  { id: "m12", band: "Motörhead", title: "Ace of Spades", year: 1980, subgenre: "Speed Metal", youtubeId: "3mbvWn1EY6g", difficulty: "medium" },
  { id: "m13", band: "Dio", title: "Holy Diver", year: 1983, subgenre: "Heavy Metal", youtubeId: "kDDkmxQvqzE", difficulty: "medium" },
  { id: "m14", band: "Guns N' Roses", title: "Welcome to the Jungle", year: 1987, subgenre: "Hard Rock", youtubeId: "o1tj2zJ2Wvg", difficulty: "medium" },
  { id: "m15", band: "Rammstein", title: "Du Hast", year: 1997, subgenre: "Industrial Metal", youtubeId: "W3q8Od5qJio", difficulty: "medium" },
  { id: "m16", band: "Marilyn Manson", title: "The Beautiful People", year: 1996, subgenre: "Industrial Metal", youtubeId: "Ypkv0HeUvTc", difficulty: "medium" },
  { id: "m17", band: "Audioslave", title: "Cochise", year: 2002, subgenre: "Hard Rock", youtubeId: "Rbm6GXllBiw", difficulty: "medium" },
  { id: "m18", band: "Bullet for My Valentine", title: "Tears Don't Fall", year: 2006, subgenre: "Metalcore", youtubeId: "L4NRAlZ0dsg", difficulty: "medium" },
  { id: "m19", band: "Avenged Sevenfold", title: "Bat Country", year: 2005, subgenre: "Heavy Metal", youtubeId: "GWpFPnzFqvY", difficulty: "medium" },
  { id: "m20", band: "Godsmack", title: "I Stand Alone", year: 2002, subgenre: "Hard Rock", youtubeId: "wsl6IPFEhTU", difficulty: "medium" },
  { id: "m21", band: "Alter Bridge", title: "Blackbird", year: 2007, subgenre: "Hard Rock", youtubeId: "V2vPr6Nl1lE", difficulty: "medium" },
  { id: "m22", band: "Muse", title: "Hysteria", year: 2003, subgenre: "Alternative Rock", youtubeId: "Yvv1XibhBhs", difficulty: "medium" },
  { id: "m23", band: "Queens of the Stone Age", title: "No One Knows", year: 2002, subgenre: "Stoner Rock", youtubeId: "Fam8xoXfPjY", difficulty: "medium" },
  { id: "m24", band: "Whitesnake", title: "Here I Go Again", year: 1987, subgenre: "Glam Metal", youtubeId: "Qs3GmyBu2so", difficulty: "medium" },
  { id: "m25", band: "Def Leppard", title: "Pour Some Sugar on Me", year: 1987, subgenre: "Glam Metal", youtubeId: "0UIB9Y4OFPs", difficulty: "medium" },
  { id: "m26", band: "Mötley Crüe", title: "Kickstart My Heart", year: 1989, subgenre: "Glam Metal", youtubeId: "CmXWkMlKFkI", difficulty: "medium" },
  { id: "m27", band: "Helloween", title: "I Want Out", year: 1988, subgenre: "Power Metal", youtubeId: "-M4YKvfM6Rc", difficulty: "medium" },
  { id: "m28", band: "Nightwish", title: "Nemo", year: 2004, subgenre: "Symphonic Metal", youtubeId: "wnc4jI2Ba-A", difficulty: "medium" },
  { id: "m29", band: "In Flames", title: "Only for the Weak", year: 2000, subgenre: "Melodic Death Metal", youtubeId: "OFcJqDDlaCA", difficulty: "medium" },
  { id: "m30", band: "Killswitch Engage", title: "My Curse", year: 2006, subgenre: "Metalcore", youtubeId: "MHUwuC3fmQI", difficulty: "medium" },

  // ---------- HARD: thrash + death + prog ----------
  { id: "h1", band: "Metallica", title: "Master of Puppets", year: 1986, subgenre: "Thrash Metal", youtubeId: "xnKhsTXoKCI", difficulty: "hard" },
  { id: "h2", band: "Slayer", title: "Raining Blood", year: 1986, subgenre: "Thrash Metal", youtubeId: "z8ZqFlw6hYg", difficulty: "hard" },
  { id: "h3", band: "Megadeth", title: "Symphony of Destruction", year: 1992, subgenre: "Thrash Metal", youtubeId: "cnh1zA-Xxug", difficulty: "hard" },
  { id: "h4", band: "Anthrax", title: "Caught in a Mosh", year: 1987, subgenre: "Thrash Metal", youtubeId: "PLLdBoLNBcQ", difficulty: "hard" },
  { id: "h5", band: "Testament", title: "Practice What You Preach", year: 1989, subgenre: "Thrash Metal", youtubeId: "FhJ7VqZ6mVw", difficulty: "hard" },
  { id: "h6", band: "Exodus", title: "Bonded by Blood", year: 1985, subgenre: "Thrash Metal", youtubeId: "IsvcAMYAJJc", difficulty: "hard" },
  { id: "h7", band: "Kreator", title: "Phobia", year: 1990, subgenre: "Thrash Metal", youtubeId: "0uKzQ8xn0K0", difficulty: "hard" },
  { id: "h8", band: "Sepultura", title: "Roots Bloody Roots", year: 1996, subgenre: "Groove Metal", youtubeId: "8gvUAqBDHXM", difficulty: "hard" },
  { id: "h9", band: "Pantera", title: "Walk", year: 1992, subgenre: "Groove Metal", youtubeId: "e-i4qmDpn8g", difficulty: "hard" },
  { id: "h10", band: "Lamb of God", title: "Redneck", year: 2006, subgenre: "Groove Metal", youtubeId: "PcCAP-JISYo", difficulty: "hard" },
  { id: "h11", band: "Death", title: "Crystal Mountain", year: 1995, subgenre: "Death Metal", youtubeId: "Cq6EQpDo8Zc", difficulty: "hard" },
  { id: "h12", band: "Cannibal Corpse", title: "Hammer Smashed Face", year: 1993, subgenre: "Death Metal", youtubeId: "WSKPVh0dOvI", difficulty: "hard" },
  { id: "h13", band: "Morbid Angel", title: "God of Emptiness", year: 1993, subgenre: "Death Metal", youtubeId: "zsvyLPQxpAg", difficulty: "hard" },
  { id: "h14", band: "Obituary", title: "Chopped in Half", year: 1990, subgenre: "Death Metal", youtubeId: "n2NmvxAJZ7Y", difficulty: "hard" },
  { id: "h15", band: "Amon Amarth", title: "Twilight of the Thunder God", year: 2008, subgenre: "Melodic Death Metal", youtubeId: "mesbeh-6zHM", difficulty: "hard" },
  { id: "h16", band: "Arch Enemy", title: "Nemesis", year: 2005, subgenre: "Melodic Death Metal", youtubeId: "FyBBk3TSpEE", difficulty: "hard" },
  { id: "h17", band: "At the Gates", title: "Slaughter of the Soul", year: 1995, subgenre: "Melodic Death Metal", youtubeId: "2vf4mV0RhBw", difficulty: "hard" },
  { id: "h18", band: "Children of Bodom", title: "Hate Me!", year: 2000, subgenre: "Melodic Death Metal", youtubeId: "K3ap3aPeCoo", difficulty: "hard" },
  { id: "h19", band: "Behemoth", title: "Ov Fire and the Void", year: 2009, subgenre: "Blackened Death Metal", youtubeId: "3EWFDQlOwCg", difficulty: "hard" },
  { id: "h20", band: "Gojira", title: "Flying Whales", year: 2005, subgenre: "Progressive Death Metal", youtubeId: "gVj9Q4pjKmw", difficulty: "hard" },
  { id: "h21", band: "Opeth", title: "The Drapery Falls", year: 2001, subgenre: "Progressive Death Metal", youtubeId: "6PkXWkH9tD8", difficulty: "hard" },
  { id: "h22", band: "Tool", title: "Schism", year: 2001, subgenre: "Progressive Metal", youtubeId: "80RtBhOfSCE", difficulty: "hard" },
  { id: "h23", band: "Dream Theater", title: "Pull Me Under", year: 1992, subgenre: "Progressive Metal", youtubeId: "SGRgAULYgWE", difficulty: "hard" },
  { id: "h24", band: "Rush", title: "Tom Sawyer", year: 1981, subgenre: "Progressive Rock", youtubeId: "auLBLk4ibAk", difficulty: "hard" },
  { id: "h25", band: "King Crimson", title: "21st Century Schizoid Man", year: 1969, subgenre: "Progressive Rock", youtubeId: "sh5Lb8ZOoRc", difficulty: "hard" },
  { id: "h26", band: "Yes", title: "Roundabout", year: 1971, subgenre: "Progressive Rock", youtubeId: "cP0Ich_ovmg", difficulty: "hard" },
  { id: "h27", band: "Porcupine Tree", title: "Blackest Eyes", year: 2002, subgenre: "Progressive Rock", youtubeId: "u0YWiCcmvXo", difficulty: "hard" },
  { id: "h28", band: "Mastodon", title: "Blood and Thunder", year: 2004, subgenre: "Sludge Metal", youtubeId: "kR7dRB1Wgtk", difficulty: "hard" },
  { id: "h29", band: "Meshuggah", title: "Bleed", year: 2008, subgenre: "Djent", youtubeId: "sqUgjK5S-eQ", difficulty: "hard" },
  { id: "h30", band: "Between the Buried and Me", title: "Selkies: The Endless Obsession", year: 2005, subgenre: "Progressive Metalcore", youtubeId: "1uZmDgWkNfA", difficulty: "hard" },
];

export function tracksFor(difficulty: Difficulty) {
  return TRACKS.filter((t) => t.difficulty === difficulty);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

export type Question = {
  track: Track;
  options: Track[];
};

export function buildQuestions(difficulty: Difficulty, count: number): Question[] {
  const pool = tracksFor(difficulty);
  const picks = shuffle(pool).slice(0, Math.min(count, pool.length));
  return picks.map((track) => {
    const distractors = shuffle(pool.filter((t) => t.id !== track.id)).slice(0, 3);
    return { track, options: shuffle([track, ...distractors]) };
  });
}
