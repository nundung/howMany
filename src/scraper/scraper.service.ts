import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

const puppeteer = require('puppeteer');

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  //MOSTPLAYED (currentPlayer 15분마다 업데이트)
  @Cron('*/15 * * * *')
  async handleCronFor15minute() {
    this.logger.debug('Running scheduled scraping task for most played charts');
    await this.scrapMostPlayedCharts();
  }

  //TOP SELLERS (Top 100 selling games right now, by revenue)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCronForEveryDay() {
    this.logger.debug('Running scheduled scraping task for top sellers');
    await this.scrapTopSellerCharts('KR');
    await this.scrapTopSellerCharts('US');
    await this.scrapTopSellerCharts('JP');
    await this.scrapTopSellerCharts('CN');
  }

  //MOSTPLAYED (currentPlayer 15분마다 업데이트)
  async scrapMostPlayedCharts() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto('https://store.steampowered.com/charts/mostplayed');
      const tableSelector =
        '#page_root > div:nth-child(5) > div > div > div > div._3sJkwsBQuiAc_i3VOWX4tv > table';
      await page.waitForSelector(tableSelector);

      // 각 행의 데이터를 추출
      const games = await page.evaluate((tableSelector) => {
        const rows = document.querySelectorAll(`${tableSelector} > tbody > tr`);
        return Array.from(rows).map((row) => {
          const columns = row.querySelectorAll('td');
          return {
            rank: columns[1].innerText.trim(),
            name: columns[2].innerText.trim(),
            price: columns[3].innerText.trim(),
            currentPlayers: columns[4].innerText.trim(),
            peakPlayers: columns[5].innerText.trim(),
          };
        });
      }, tableSelector);
      console.log(games);
      return games;
    } catch (error) {
      console.error('Error during scraping:', error);
    } finally {
      await browser.close();
    }
  }

  //TOP SELLERS (Top 100 selling games right now, by revenue)
  async scrapTopSellerCharts(region: string) {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    try {
      await page.goto(
        `https://store.steampowered.com/charts/topselling/${region}`,
      );

      // 차트 데이터 추출
      const tableSelector =
        '#page_root > div:nth-child(5) > div > div > div > div._3sJkwsBQuiAc_i3VOWX4tv > table';
      await page.waitForSelector(tableSelector);

      // 각 행의 데이터를 추출
      const games = await page.evaluate((tableSelector) => {
        const rows = document.querySelectorAll(`${tableSelector} > tbody > tr`);
        return Array.from(rows).map((row) => {
          const columns = row.querySelectorAll('td');
          return {
            rank: columns[1].innerText.trim(),
            name: columns[2].innerText.trim(),
            price: columns[3].innerText.trim(), //Today's price for this game.
            change: columns[4].innerText.trim(), //Change in rank compared to previous week.
            weeks: columns[5].innerText.trim(), //Number of weeks in top 100
          };
        });
      }, tableSelector);
      console.log(games);
      return games;
    } catch (error) {
      console.error('Error during scraping:', error);
    } finally {
      await browser.close();
    }
  }
}