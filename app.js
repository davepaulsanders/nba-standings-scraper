const puppeteer = require("puppeteer");

async function getNBAStandings() {
  console.log(`Getting NBA Standings.....`);
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.cbssports.com/nba/standings/");

    // Getting teams from CBS
    let teams = await page.$$eval("span a", (teams) =>
      teams.map((team) => {
        return team.textContent;
      })
    );

    //let wins = await page.$$eval('#TableBase-1 > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)' , (wins) =>  wins);
    await browser.close();

    // removing extra data included during selection
    teams = teams.filter((team) => team !== "");
    //console.log(wins);
    // splitting into conferences and adding number ranking
    const Eastern = teams.splice(0, 15).map((team, index) => {
      return `${index + 1}: ${team}`;
    });
    const Western = teams.splice(0, 15).map((team, index) => {
      return `${index + 1}: ${team}`;
    });
    const conferenceStandings = { Eastern, Western };
    return conferenceStandings;
    // These values could also be returned as a module
    console.log(`
    ==================================================================================================

    ███╗░░██╗██████╗░░█████╗░  ░██████╗████████╗░█████╗░███╗░░██╗██████╗░██╗███╗░░██╗░██████╗░░██████╗
    ████╗░██║██╔══██╗██╔══██╗  ██╔════╝╚══██╔══╝██╔══██╗████╗░██║██╔══██╗██║████╗░██║██╔════╝░██╔════╝
    ██╔██╗██║██████╦╝███████║  ╚█████╗░░░░██║░░░███████║██╔██╗██║██║░░██║██║██╔██╗██║██║░░██╗░╚█████╗░
    ██║╚████║██╔══██╗██╔══██║  ░╚═══██╗░░░██║░░░██╔══██║██║╚████║██║░░██║██║██║╚████║██║░░╚██╗░╚═══██╗
    ██║░╚███║██████╦╝██║░░██║  ██████╔╝░░░██║░░░██║░░██║██║░╚███║██████╔╝██║██║░╚███║╚██████╔╝██████╔╝
    ╚═╝░░╚══╝╚═════╝░╚═╝░░╚═╝  ╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░╚═════╝░

    ==================================================================================================`);

    console.log(`=============== EASTERN ===============`);
    Eastern.forEach((team) => console.log(team));
    console.log(`=============== WESTERN ===============`);
    Western.forEach((team) => console.log(team));
  } catch (e) {
    console.log(e.message);
  }
}
module.exports = getNBAStandings;
