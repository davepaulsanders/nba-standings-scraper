const puppeteer = require("puppeteer");

const getStandings = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.cbssports.com/nba/standings/");
    // Getting team abbreviations from ESPN
    let teams = await page.$$eval("span a", (teams) =>
      teams.map((team) => {
        return team.textContent;
      })
    );

    await browser.close();
    teams = teams.filter(
      (team) => team !== "" && team !== "Promoted by Taboola"
    );
    const Eastern = teams.splice(0, 15).map((team, index) => {
      return `${index + 1}: ${team}`;
    });
    const Western = teams.map((team, index) => {
      return `${index + 1}: ${team}`;
    });
    console.log(Eastern);
    console.log(Western);
  } catch (e) {
    console.log(e.message);
  }
};

getStandings();
