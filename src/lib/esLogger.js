import { ElasticsearchTransport } from 'winston-elasticsearch';
import { format } from 'winston';

/**
 * @param {Client} esClient 
 * @param {String} pattern 
 * @returns ElasticsearchTransport 
 * Return the Elastic search logger transporter
 */
export const esLogger = (esClient, pattern) => new ElasticsearchTransport({
  level: 'info',
  indexPrefix: pattern,
  client: esClient,
  format: format.json()
});