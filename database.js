const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(__dirname + '/items.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

const createTableSql = `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        affiliation VARCHAR(255) NOT NULL,
        other_names VARCHAR(255),
        species VARCHAR(255),
        homeland VARCHAR(255),
        comments TEXT,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

db.run(createTableSql, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully');

        const checkDataSql = `SELECT COUNT(*) AS count FROM items`;
        db.get(checkDataSql, (err, row) => {
            if (err) {
                console.error('Error checking table data:', err.message);
            } else if (row.count === 0) {
                console.log('No data found. Inserting initial data...');
                
                const insertInitialData = `
                    INSERT INTO items (name, affiliation, other_names, species, homeland, comments) VALUES
                    ('Achilles', 'Achaeans', '-', 'Demigod', 'Phthia', 'The most powerful sulking warrior in The Iliad. He commands the Myrmidons.'),
                    ('Agamemnon', 'Achaeans', 'Atrides', 'Human', 'Mycenae', 'Killed by his wife.'),
                    ('Patroclus', 'Achaeans', '-', 'Human', 'Phthia', 'The best of the Myrmidons. Therapon of Achilles.'),
                    ('Ulysses', 'Achaeans', 'Odysseus', 'Human', 'Ithaca', 'A fine warrior and the cleverest and shortest of the Achaean commanders'),
                    ('Diomedes', 'Achaeans', 'Tydides', 'Human', 'Argos', 'Wounded Ares and Aphrodite.'),
                    ('Menelaus', 'Achaeans', '-', 'Human', 'Sparta', 'King of Sparta and the younger brother of Agamemnon. While it is the abduction of his wife, Helen, by the Trojan prince Paris that sparks the Trojan War, Menelaus proves quieter, less imposing, and less arrogant than Agamemnon.'),
                    ('Hector', 'Trojans', '-', 'Human', 'Troy', 'A son of King Priam and Queen Hecuba, Hector is the mightiest warrior in the Trojan army. Hates Paris.'),
                    ('Priam', 'Trojans', 'Podarces', 'Human', 'Troy', 'King of Troy and husband of Hecuba, Priam is the father of fifty Trojan warriors, including Hector and Paris.'),
                    ('Paris', 'Trojans', 'Alexander', 'Human', 'Troy', 'His abduction of the beautiful Helen, wife of Menelaus, sparked the Trojan War. Paris is self-centered and often unmanly. He fights effectively with a bow and arrow but often lacks the spirit for battle and prefers to sit in his room making love to Helen while others fight for him, thus earning both the scorn of Helen and Hector.'),
                    ('Helen', 'Trojans', '-', 'Human', 'Sparta', 'As the daughter of Zeus and a mortal woman named Leda, Helen of Troy''s legendary beauty was divine in origin. She had many suitors in her youth but ultimately married Menelaus. The pair ruled Sparta until Helen left with Paris.'),
                    ('Zeus', 'Neutral', 'Jupiter, Jove', 'God', 'Olympus', 'King of the gods and husband of Hera, Zeus claims neutrality in the conflict of mortals and often tries to keep the other gods from participating in it. However, he throws his weight behind the Trojan side for much of the battle after the sulking Achilles has his mother, Thetis, ask the god to do so.'),
                    ('Hera', 'Achaeans', 'Juno', 'Goddess', 'Olympus', 'Queen of the gods, Hera is a conniving, headstrong woman. She worked with Athena to crush the Trojans, whom she passionately hates.'),
                    ('Athena', 'Achaeans', 'Pallas, Minerva', 'Goddess', 'Olympus', 'The goddess of wisdom, purposeful battle, and the womanly arts. Like Hera, Athena passionately hates the Trojans and often gives the Achaeans valuable aid.'),
                    ('Thetis', 'Achaeans', '-', 'Sea-nymph', 'The ocean', 'Mother of Achilles. Thetis demonstrates her love and support of Achilles by coming to his aid several times.'),
                    ('Apollo', 'Trojans', 'Phoebus', 'God', 'Olympus', 'A son of Zeus and twin brother of the goddess Artemis, Apollo is god of the sun and the arts, particularly music. He supports the Trojans and often intervenes in the war on their behalf.'),
                    ('Aphrodite', 'Trojans', 'Venus', 'Goddess', 'Olympus', 'Goddess of love and daughter of Zeus, Aphrodite is married to Hephaestus but maintains a romantic relationship with Ares. She supports Paris and the Trojans throughout the war, though she proves somewhat ineffectual in battle.'),
                    ('Poseidon', 'Achaeans', 'Neptune', 'Goddess', 'Olympus', 'The brother of Zeus and god of the sea. Poseidon holds a long-standing grudge against the Trojans because they never paid him for helping them to build their city. He therefore supports the Achaeans in the war.'),
                    ('Hephaestus', 'Achaeans?', 'Vulcan', 'God', 'Olympus', 'God of fire and husband of Aphrodite, Hephaestus a metalsmith and is known as the lame or crippled god. Although the text does not make clear his sympathies in the struggle, he helps the Achaeans by forging a new set of armor for Achilles and by rescuing Achilles during his fight with a river god.'),
                    ('Artemis', 'Trojans', 'Diana', 'Goddess', 'Olympus', 'Goddess of the hunt, daughter of Zeus, and twin sister of Apollo. Artemis supports the Trojans in the war.'),
                    ('Ares', 'Trojans', 'Mars', 'God', 'Olympus', 'God of war and lover of Aphrodite, Ares generally supports the Trojans in the war. Wounded by Dionysus.')
                `;
                db.run(insertInitialData, (err) => {
                    if (err) {
                        console.error('Error inserting initial data:', err.message);
                    } else {
                        console.log('Initial data inserted successfully.');
                    }
                });
            } else {
                console.log('Data already exists. Skipping initial data insertion.');
            }
        });
    }
});

module.exports = db;
