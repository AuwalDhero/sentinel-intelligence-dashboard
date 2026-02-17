
import { MonitoringConfig } from './types';

export const INITIAL_CONFIG: MonitoringConfig = {
  keywords: [
    'Nigeria Police Force',
    'NPF',
    'Inspector-General of Police',
    'IGP Kayode Egbetokun',
    'Cybercrime Nigeria',
    'NPF-NCCC',
    'Director NPF-NCCC',
    'Cybersecurity Nigeria',
    'Yahoo Boys Nigeria',
    'Police brutality Nigeria',
    'EndSARS',
    'SecureNigeria'
  ],
  scope: [
    'National Security',
    'Public Trust in Policing',
    'Cybercrime Trends',
    'Institutional Integrity',
    'Internal Security Operations'
  ],
  platforms: ['Twitter/X', 'Facebook', 'Instagram', 'TikTok', 'WhatsApp Channels', 'Telegram']
};

export const MOCK_LIVE_LOGS = [
  { timestamp: new Date().toISOString(), platform: 'Twitter/X', event: 'High volume surge: "NPF-NCCC" mentioned in viral cybercrime thread.' },
  { timestamp: new Date(Date.now() - 60000).toISOString(), platform: 'Facebook', event: 'New post by Major News Outlet regarding IGP directives.' },
  { timestamp: new Date(Date.now() - 120000).toISOString(), platform: 'TikTok', event: 'Trend detection: Humor-based critique of police checkpoints gaining 50k views.' },
  { timestamp: new Date(Date.now() - 180000).toISOString(), platform: 'Instagram', event: 'Sentiment shift detected: Negative comments increasing on NPF official handle.' },
];
