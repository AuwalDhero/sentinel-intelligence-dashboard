
export interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Engagement {
  volume: number;
  trend_score: number;
}

export interface Trend {
  title: string;
  description: string;
  sentiment: Sentiment;
  matched_keywords: string[];
  platforms: string[];
  engagement: Engagement;
}

export interface TeamBReport {
  id: string;
  report_date: string;
  time: string;
  executive_summary: string[];
  general_outlook: string;
  new_developments: Trend[];
  assessment: string[];
  recommendations: string[];
  sign_off: string;
}

export enum DashboardTab {
  REPORTS = 'reports',
  ANALYTICS = 'analytics',
  KEYWORDS = 'keywords',
  LIVE_FEED = 'live_feed'
}

export interface MonitoringConfig {
  keywords: string[];
  scope: string[];
  platforms: string[];
}
