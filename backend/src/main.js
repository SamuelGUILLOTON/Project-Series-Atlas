import express from "express";
import bodyParser from "body-parser";
import mariadb from "mariadb";
import bcrypt from 'bcrypt';

const pool = mariadb.createPool({
  host: "127.0.0.1", 
  user: "root",
  password: "root",
  database: "series_atlas",
  port: 3306,
});
const app = express();
app.use(bodyParser.json());
app.use("/", express.static("public"));

//have all series
app.get("/series", async (req, res) => {
  const conn = await pool.getConnection();
  const series = await conn.query("SELECT * FROM program");
  res.json(series);
  conn.end();
});

//have one program
app.get("/serie/:id", async (req, res) => {
  const id = req.params.id
  const conn = await pool.getConnection();
  const serie = await conn.query("SELECT p.title, p.synopsis, p.poster, p.year, c.name FROM program as p JOIN category as c ON p.category_id = c.id WHERE p.id = ?", id);
  res.json(serie);
  conn.end();
});

//have seasons of one program
app.get("/seasons/:id", async (req, res) => {
  const id = req.params.id
  const conn = await pool.getConnection();
  const seasons = await conn.query(
    "SELECT DISTINCT s.id, program_id, s.year, s.description, s.number FROM season as s INNER JOIN program as p ON program_id = ?", id
    );
  res.json(seasons);
  conn.end();
});

//have comment of one program
app.get("/comment/:id", async (req, res) => {
  const id = req.params.id
  const conn = await pool.getConnection();
  const comments = await conn.query(
    "SELECT DISTINCT c.create, c.comment, c.rate, u.username, u.email FROM comment as c INNER JOIN program as p ON program_id = ? INNER JOIN user as u ON c.user_id = u.id", id
    );
  res.json(comments);
  conn.end();
});

//check auth
app.get("auth", async (req, res) => {
  console.log('auth')
  const token = req.params.token
  const conn = await pool.getConnection();
  const user = await conn.query("SELECT * FROM user WHERE token = ?", token);
  if (user) {
    res.json({auth: true});
    console.log(res)
    conn.end();
  } else {
    res.json({auth: false});
    conn.end();
  }
  conn.end();
});

// have one serie
app.get("/serie/show/:id", async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();
  const episodes = await conn.query(
    "SELECT DISTINCT e.id, season_id, e.title, e.number, e.synopsis FROM episode as e INNER JOIN season as s ON s.id = e.season_id INNER JOIN program AS p ON s.program_id = ?", id
  );
  res.json(episodes);
  conn.end();
});

app.get("/category", async (req, res) => {
  const conn = await pool.getConnection();
  const series = await conn.query("SELECT * FROM category");
  res.json(series);
  conn.end();
});

//add one comment
app.post("/comment/add/:id", async (req, res) => {
  const token = req.headers['authorization'];
  const conn = await pool.getConnection();
  if (token !== undefined) {
  const id = req.params.id
  const comment = req.body
  const date = new Date(req.query.date);
  const queryResult = await conn.query(
    "INSERT INTO comment (`user_id`, `program_id`, `create`, `comment`, `rate`) values (?, ?, ?, ?, ?)",
    [2, id, comment.date, comment.comment, 0]
    ); 
  res.json();
  conn.end();
 } else {
  res.status(403).json({message: ' Accès refusé'});
  conn.end();
 }

});

//add one user
app.post("/register", async (req, res) => {
  const user = req.body
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  const conn = await pool.getConnection();
  const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  const queryResult = await conn.query(
    "INSERT INTO user (`username`, `email`, `password`, `bio`) values (?, ?, ?, ?)",
    [user.username, user.email, hash, user.bio]
    ); 
  res.json({
    auth: true
  });
  conn.end();
});

//login
app.post("/login", async (req, res) => {
  const user = req.body
  const conn = await pool.getConnection();
  const userFound = await conn.query("SELECT * FROM user WHERE email = ?", user.email); 
  if ( userFound !== undefined && user.password !== undefined && userFound[0].password !== 0 ) {
    const result = bcrypt.compareSync(user.password, userFound[0].password)
    if ( result === true ) {
      var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
      };
    const token = rand() + rand(); // to make it longer
    const addToken = await conn.query( "UPDATE user SET token = ? WHERE id = ?", [token, userFound[0].id]); 
      res.append('Authorization', token).json({auth: true});
      conn.end();
    } else {
      res.json({
        auth: false,
        });
    }
  }
});

//logout
app.get("/logout", async (req, res) => {
  const token = req.headers['authorization'];
  console.log(token)
  if (token !== undefined) { 
    const conn = await pool.getConnection();
    console.log(token)
    const queryResult = await conn.query(
      "UPDATE user SET token = '' WHERE token =?", token); 
      console.log(queryResult)
    res.json({logout: true});
    console.log(res.body)
    conn.end();
  } else {
    res.status(403).json({message: ' Accès refusé'});
  }
});

//add one episode
app.post("/add/:id/episode/", async (req, res) => {
    const token = req.headers['authorization'];
    if (token !== undefined) {
      console.log('ok')
      const id = req.params.id
      const episode = req.body
      const conn = await pool.getConnection();
      const queryResult = await conn.query(
        "INSERT INTO episode (`season_id`, `title`, `number`, `synopsis`, `program_id`) values (?, ?, ?, ?, ?)",
        [episode.season, episode.title, episode.number, episode.synopsis, id]
        ); 
      res.json();
      conn.end();
    } else {
      res.status(403).json({message: ' Accès refusé'});
    }
});

//update one program
app.post("/update/:id/program/", async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== undefined) {
  const id = req.params.id
  const program = req.body
  const conn = await pool.getConnection();
  const queryResult = await conn.query(
    "UPDATE program SET title = ?, synopsis = ?, poster = ?, year = ?, category_id = ?  WHERE id = ?",
    [program[0].title, program[0].synopsis, program[0].poster, program[0].year, program[0].category_id, id]
    ); 
    console.log(queryResult)
    res.json();
    conn.end();
  } else {
    res.status(403).json({message: ' Accès refusé'});
  }
});

//add a program in database
app.post("/add", async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== undefined) {
    const serie = req.body;
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
    `INSERT INTO program (title, synopsis, poster, year, category_id) value (?, ?, ?, ?, ?)`,
    [serie.title, serie.synopsis, serie.poster, serie.year, serie.category_id]
    ); 
    conn.end();
    res.end();
  } else {
    res.status(403).json({message: 'Accès refusé'});
  }
});


//add a category in database
app.post("/create-category", async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== undefined) {
    const category = req.body;
    console.log(req.body)
    const conn = await pool.getConnection();
    const queryResult = await conn.query("INSERT INTO category (`name`) value (?)", category.category_name); 
    conn.end();
    res.end();
  } else {
    res.status(403).json({message: 'Accès refusé'});
  }
});

//delete one serie                                                                                                                          
app.delete("/serie/delete/:id", async (req, res) => {
  const token = req.headers['authorization'];
  console.log(req.headers['authorization'])
  if (token !== undefined) {
  const id = req.params.id;
  const conn = await pool.getConnection();
  const queryResult = await conn.query(`DELETE FROM program WHERE id = ?`, id);
  res.end();
  conn.end();
} else {
  res.status(403).json({message: 'Accès refusé'});
}
});

//manage 404 error
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.listen(3000);
