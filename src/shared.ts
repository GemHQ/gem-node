import * as debug from 'debug';

/**
 * The GEM client debugger
 */
export const dbg = debug('gem:client');

/**
 * The Gem API base URL
 */
export const GEM_BASE_URL = 'https://vgs-sandbox.gem.co';

/**
 * Gem API endpoints used by the client
 */
export enum Endpoints {
  users = '/users',
  profiles = '/profiles',
  documents = '/documents',
  institutions = '/institutions',
  institution_users = '/institution_users',
}
