import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { takeCoverage } from 'v8';

const puppeteer = require('puppeteer');

@Injectable()
export class ScraperService {
  constructor(private readonly httpService: HttpService) {}

  async scrapeMostPlayedCharts() {
    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto('https://store.steampowered.com/charts/mostplayed', {});

    const tableSelector =
      '#page_root > div:nth-child(5) > div > div > div > div._3sJkwsBQuiAc_i3VOWX4tv > table';
    await page.waitForSelector(tableSelector);

    // 각 행의 데이터를 추출
    const games = await page.evaluate((tableSelector) => {
      const rows = document.querySelectorAll(`${tableSelector} > tbody > tr`);
      const gamesList = [];

      rows.forEach((row) => {
        const blankElement = row.querySelector('td:nth-child(1)');
        const rankElement = row.querySelector('td:nth-child(2)');
        const nameElement = row.querySelector('td:nth-child(3)');
        const priceElement = row.querySelector('td:nth-child(4)');
        const currentPlayersElement = row.querySelector('td:nth-child(5)');
        const peakPlayersElement = row.querySelector('td:nth-child(6)');

        const blank = blankElement ? blankElement.textContent.trim() : '';
        const rank = rankElement ? rankElement.textContent.trim() : '';
        const name = nameElement ? nameElement.textContent.trim() : '';
        const price = priceElement ? priceElement.textContent.trim() : '';
        const currentPlayers = currentPlayersElement
          ? currentPlayersElement.textContent.trim().replace(/,/g, '')
          : '';
        const peakPlayers = peakPlayersElement
          ? peakPlayersElement.textContent.trim().replace(/,/g, '')
          : '';

        gamesList.push({
          blank,
          rank,
          name,
          price,
          currentPlayers,
          peakPlayers,
        });
      });

      return gamesList;
    }, tableSelector);

    console.log(games);

    await browser.close();
  }
}
