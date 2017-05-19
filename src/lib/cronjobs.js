import cron from 'node-schedule';
import scraper from '../scraping';

cron.scheduleJob('* * * * * *', () => scraper());
