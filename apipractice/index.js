const express = require('express'), http = require('http');
const cors = require('cors')
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const hostname = 'localhost';
const port = 8080;
const app = express();
app.use(cors())
const sample_server = http.createServer(app);

let db = admin.firestore();

sample_server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/testWrite', async function (req, res) {
    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

    res.send('<h1>sent data</h1>')
});

app.get('/testRead', async function (req, res) {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });

    res.json(snapshot)
});

app.get('/add/:n1?/:n2?', function (req, res) {
    console.log("/monkey");
    let number1 = req.query.n1;
    let number2 = req.query.n2;
    let number3 = parseInt(number1) + parseInt(number2);
    res.json( {result: number3});
});

app.get('/newCharacter/:name?', async function (req, res) {
    const docRef = db.collection('character').doc(req.query.name);

    let character = {
        name: req.query.name,
        level: 10,
        currHp: 100,
        baseStats: {
            atk: Math.random() * 10,
            def: Math.random() * 10,
            spd: Math.random() * 10,
            eva: Math.random() * 10,
            maxHp: (Math.random() * 100) + 100,
        },
        growthRate: {
            atk: Math.random(),
            def: Math.random(),
            spd: Math.random(),
            eva: Math.random(),
            maxHp: Math.random(),
        },
        stats: {
            atk: 0,
            def: 0,
            spd: 0,
            eva: 0,
            maxHp: 0,
        }
    }

    let generateStat = (baseStat, growthrate, level) => {
        let stat = baseStat;
        for (let i = 0; i < level; i++) {
            if (Math.random() < growthrate) {
                stat++;
            }
        }
        return stat;
    }

    character.stats.atk = Math.floor(generateStat(character.baseStats.atk, character.growthRate.atk, character.level))
    character.stats.def = Math.floor(generateStat(character.baseStats.def, character.growthRate.def, character.level))
    character.stats.spd = Math.floor(generateStat(character.baseStats.spd, character.growthRate.spd, character.level))
    character.stats.eva = Math.floor(generateStat(character.baseStats.eva, character.growthRate.eva, character.level))
    character.stats.maxHp = Math.floor(generateStat(character.baseStats.maxHp, character.growthRate.maxHp, character.level))

    await docRef.set(character);

    res.send(character)
});

app.get('/', function (req, res) {
    console.log("/home");
    res.send('<h1>home</h1>');
});
