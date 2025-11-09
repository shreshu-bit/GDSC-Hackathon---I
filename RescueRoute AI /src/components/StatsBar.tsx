import { Activity, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const stats = [
  {
    icon: Activity,
    label: 'Active Incidents',
    value: '3',
    trend: '+2 from last hour',
    color: 'text-red-400',
  },
  {
    icon: Users,
    label: 'Units Deployed',
    value: '12',
    trend: '8 available',
    color: 'text-blue-400',
  },
  {
    icon: AlertCircle,
    label: 'Avg Response Time',
    value: '4.2 min',
    trend: '-0.5 min vs avg',
    color: 'text-green-400',
  },
  {
    icon: TrendingUp,
    label: 'Routes Optimized',
    value: '47',
    trend: 'Today',
    color: 'text-yellow-400',
  },
];

export function StatsBar() {
  return (
    <div className="bg-slate-100 dark:bg-zinc-900 border-t border-slate-300 dark:border-zinc-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-2 sm:p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-zinc-400 mb-0.5 sm:mb-1 truncate">{stat.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-500 mt-0.5 sm:mt-1 truncate">{stat.trend}</p>
                </div>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
