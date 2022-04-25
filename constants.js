/* eslint import/prefer-default-export: 0 */
import eg from './images/team/eg.jpg';
import michael from './images/team/michael.jpg';
import nicola from './images/team/nicola.jpg';
import andrew from './images/team/andrew.jpg';
import ryan from './images/team/ryan.jpg';
import daniela from './images/team/daniela.jpg';
import godsey from './images/team/godsey.jpg';
import chip from './images/team/chip.jpg';
import eileen from './images/team/eileen.jpg';
import johan from './images/team/johan.jpg';
import jee from './images/team/jee.jpg';
import tim from './images/team/tim.jpg';
import julian from './images/team/julian.jpg';
import gwen from './images/team/gwen.jpg';
import talia from './images/team/talia.jpg';
import jarrod from './images/team/jarrod.jpg';
import sam from './images/team/sam.jpg';

export const SECOND = 1000;
export const MINUTE = 60000;
export const DAY = 86400000;

export const V1_API_URL = 'https://api.infura.io/v1';

export const API_URL = process.env.NODE_ENV === 'development' ? 'https://infura.io/api/' : '/api/';

export const TEAM = [
  {
    imgUrl: chip,
    name: 'Chip Borelli',
    role: 'Talent Partner',
  },
  {
    imgUrl: jee,
    name: 'Jee Choi',
    role: 'Senior Systems Engineer',
  },
  {
    imgUrl: nicola,
    name: 'Nicola Cocchiaro',
    role: 'Lead Systems Engineer',
  },
  {
    imgUrl: andrew,
    name: 'Andrew Cohen',
    role: 'Lead Designer',
  },
  {
    imgUrl: gwen,
    name: 'Gwen Faraday',
    role: 'Software Engineer',
  },
  {
    imgUrl: eg,
    name: 'E.G. Galano',
    role: 'Co-founder and Chief Infrastructure Engineer',
  },
  {
    imgUrl: godsey,
    name: 'Michael Godsey',
    role: 'Product Manager',
  },
  {
    imgUrl: johan,
    name: 'Johan Hermansson',
    role: 'Senior Systems Engineer',
  },
  {
    imgUrl: talia,
    name: 'Talia Knowles-Rivas',
    role: 'Product Marketing Manager',
  },
  {
    imgUrl: eileen,
    name: 'Eileen Lu',
    role: 'Operations',
  },
  {
    imgUrl: sam,
    name: 'Sam McCord',
    role: 'Software Engineer',
  },
  {
    imgUrl: tim,
    name: 'Tim Myers',
    role: 'Senior Systems Engineer',
  },
  {
    imgUrl: daniela,
    name: 'Daniela Osorio',
    role: 'Director of Global Partnerships',
  },
  {
    imgUrl: jarrod,
    name: 'Jarrod Perez',
    role: 'Software Engineer',
  },
  {
    imgUrl: julian,
    name: 'Julian Reyes',
    role: 'Senior Systems Engineer',
  },
  {
    imgUrl: ryan,
    name: 'Ryan Schneider',
    role: 'Senior Systems Engineer',
  },
  {
    imgUrl: michael,
    name: 'Michael Wuehler',
    role: 'Co-founder and Business Development',
  },
];

export const NETWORKS = [
  {
    network: 'Mainnet',
  },
  {
    network: 'Ropsten',
  },
  {
    network: 'INFURAnet',
  },
  {
    network: 'Kovan',
  },
  {
    network: 'Rinkeby',
  },
  {
    network: 'IPFS',
  },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ONBOARDING_STEPS = [
  {
    id: 'onboarding-01',
    titleCopy: 'CREATE YOUR FIRST PROJECT',
    bodyCopy:
      'Each project contains the unique API credentials required to send requests from your application. We recommend having at least one project per application running with Infura.',
    side: 'left',
    buttonCopy: 'next',
  },
  {
    id: 'onboarding-02',
    titleCopy: 'COPY YOUR KEYS AND ENDPOINTS',
    bodyCopy:
      'Projects have an ID and secret for sending requests. Using HTTPS/TLS basic auth you can securely send requests with your project secret. Keep your "project secret" secret!',
    side: 'top',
    buttonCopy: 'next',
  },
  {
    id: 'onboarding-03',
    titleCopy: 'WHITELIST FOR ADDED SECURITY',
    bodyCopy:
      "Sometimes your Project ID is deployed in an environment where it can't be kept private. Use these Whitelist security options to protect the integrity of your traffic statistics.",
    side: 'top',
    buttonCopy: 'complete',
  },
];

export const SCOPE_MAP = {
  'projects.read': 'Read/Write Projects',
  'projects.write': 'Create Projects',
  'projects.delete': 'Delete Projects',
  'user.read': 'Read User',
  offline: 'Act on Your Behalf',
};
