const express = require("express");
const app = express();
const PORT = 3100;
const dbConnection = require("./dbConnection.js");
const cors = require("cors");
const FRONT_END_PER_PAGE = 50;
const SqlString = require("sqlstring");
const actions = require("./actions.js");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.get("/api/query/:page(\\d+)", cors(corsOptions), (req, res) => {
  if (parseInt(req.params.page, 10) > Number.MAX_SAFE_INTEGER) {
    res.sendStatus(400);
  } else {
    let startRowNumber = (req.params.page - 1) * FRONT_END_PER_PAGE;
    dbConnection.query(
      `SELECT \`terms\`.*, \`categories\`.\`title\` AS \`cat_title\`, \`categories\`.\`id\` AS \`cat_id\` FROM \`terms\` LEFT JOIN \`categories\` ON \`terms\`.\`cat_id\`=\`categories\`.\`id\` LIMIT ${startRowNumber},50;`,
      (err, result, fields) => {
        if (err) throw Error("[!] Maglumat bazasynda yalnyshlyk!");
        res.send(result);
      }
    );
  }
});

app.get("/api/quiz", cors(corsOptions), (req, res) => {
  dbConnection.query(
    "SELECT `id`, `term_tm`, `term_ru`, `term_en`, `exp_tm`, `exp_ru`, `exp_en` FROM `terms` ORDER BY RAND() LIMIT 10;",
    (err, result, fields) => {
      if (err) throw Error("[!] Maglumat bazasynda yalnyshlyk!");
      const ids = [];
      result.map((row, i) => ids.push(row.id));
      const placeholders = ids.join(",");
      dbConnection.query(
        "SELECT `exp_tm`, `exp_ru`, `exp_en` FROM `terms` WHERE id NOT IN (" +
          placeholders +
          ") ORDER BY RAND() LIMIT 30;",
        (err2, result2) => {
          if (err2) throw Error("[!] Maglumat bazasynda yalnyshlyk!");
          const quiz = [];
          result.map((row, i) =>
            quiz.push({
              id: ids[i],
              term: { tm: row.term_tm.trim(), ru: row.term_ru.trim(), en: row.term_en.trim() },
              answers: [
                { tm: row.exp_tm.trim(), ru: row.exp_ru.trim(), en: row.exp_en.trim() },
                {
                  tm: result2[i].exp_tm.trim(),
                  ru: result2[i].exp_ru.trim(),
                  en: result2[i].exp_en.trim(),
                },
                {
                  tm: result2[i + 1].exp_tm.trim(),
                  ru: result2[i + 1].exp_ru.trim(),
                  en: result2[i + 1].exp_en.trim(),
                },
                {
                  tm: result2[i + 2].exp_tm.trim(),
                  ru: result2[i + 2].exp_ru.trim(),
                  en: result2[i + 2].exp_en.trim(),
                },
              ],
            })
          );

          res.json(quiz);
        }
      );
    }
  );
});

app.get("/api/search", cors(corsOptions), (req, res) => {
  let term = req.query.term;
  let lang = req.query.lang;
  dbConnection.query(
    `SELECT \`terms\`.*, \`categories\`.\`title\` AS \`cat_title\`, \`categories\`.\`id\` AS \`cat_id\` FROM \`terms\` LEFT JOIN \`categories\` ON \`terms\`.\`cat_id\`=\`categories\`.\`id\` WHERE \`terms\`.\`term_${lang}\` LIKE('%${term}%') LIMIT 200;`,
    (err, result, fields) => {
      if (err) throw Error("[!] Maglumat bazasynda yalnyshlyk!");
      res.send(result);
    }
  );
});

app.get("/api/total_items", cors(corsOptions), (req, res) => {
  dbConnection.query(
    "SELECT COUNT(`id`) AS `t` FROM `terms`",
    (err, result, fields) => {
      let total_items = result.map((row) => row["t"])[0];
      res.json({
        total_items,
      });
    }
  );
});

app.get("/*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`[+] KiberSozluk server is working on port ${PORT}...`);
});
