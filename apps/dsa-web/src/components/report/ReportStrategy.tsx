import type React from 'react';
import type { ReportLanguage, ReportStrategy as ReportStrategyType } from '../../types/analysis';
import { Card } from '../common';
import { getReportText, normalizeReportLanguage } from '../../utils/reportLanguage';

interface ReportStrategyProps {
  strategy?: ReportStrategyType;
  language?: ReportLanguage;
}

interface StrategyItemProps {
  label: string;
  value?: string;
  color: string;
}

const StrategyItem: React.FC<StrategyItemProps> = ({
  label,
  value,
  color,
}) => (
  <div className="relative overflow-hidden rounded-lg bg-elevated border border-white/5 p-3 hover:border-white/10 transition-colors">
    <div className="flex flex-col">
      <span className="text-xs text-muted-text mb-0.5">{label}</span>
      <span
        className="text-lg font-bold font-mono"
        style={{ color: value ? color : 'var(--text-muted-text)' }}
      >
        {value || '—'}
      </span>
    </div>
    {/* 底部指示条 */}
    <div
      className="absolute bottom-0 left-0 right-0 h-0.5"
      style={{ background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)` }}
    />
  </div>
);

/**
 * 策略点位区组件 - 终端风格
 */
export const ReportStrategy: React.FC<ReportStrategyProps> = ({ strategy, language = 'zh' }) => {
  if (!strategy) {
    return null;
  }

  const reportLanguage = normalizeReportLanguage(language);
  const text = getReportText(reportLanguage);

  const strategyItems = [
    {
      label: text.idealBuy,
      value: strategy.idealBuy,
      color: '#00ff88', // success
    },
    {
      label: text.secondaryBuy,
      value: strategy.secondaryBuy,
      color: '#00d4ff', // cyan
    },
    {
      label: text.stopLoss,
      value: strategy.stopLoss,
      color: '#ff4466', // danger
    },
    {
      label: text.takeProfit,
      value: strategy.takeProfit,
      color: '#ffaa00', // warning
    },
  ];

  return (
    <Card variant="bordered" padding="md">
      <div className="mb-3 flex items-baseline gap-2">
        <span className="label-uppercase">{text.strategyPoints}</span>
        <h3 className="text-base font-semibold text-white">{text.sniperLevels}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {strategyItems.map((item) => (
          <StrategyItem key={item.label} {...item} />
        ))}
      </div>
    </Card>
  );
};
