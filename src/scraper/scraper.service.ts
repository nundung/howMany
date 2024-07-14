import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

const puppeteer = require('puppeteer');

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  @Cron('*/15 * * * *')
  async handleCron() {
    this.logger.debug('Running scheduled scraping task');
    await this.scrapMostPlayedCharts();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron2() {
    this.logger.debug('Running scheduled scraping task');
    await this.scrapTopSellerCharts();
  }

  async scrapMostPlayedCharts() {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto('https://store.steampowered.com/charts/mostplayed', {});
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

  async scrapTopSellerCharts() {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto(
        'https://store.steampowered.com/charts/topselling/KR',
        {},
      );

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
            change: columns[4].innerText.trim(),
            weeks: columns[5].innerText.trim(),
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
