import { Bell, Radio, User, Sun, Moon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';

interface TopNavProps {
  onNotificationsClick: () => void;
  unreadCount: number;
}

export function TopNav({ onNotificationsClick, unreadCount }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Radio className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
            <div>
              <h1 className="text-slate-900 dark:text-white text-sm sm:text-base">RescueRoute AI</h1>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-zinc-400 hidden sm:block">Emergency Dispatch System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="text-right mr-2 sm:mr-3 md:mr-4 hidden md:block">
            <p className="text-xs sm:text-sm text-slate-900 dark:text-white">Dispatcher Station 4</p>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-zinc-400">District North - Active</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
            onClick={onNotificationsClick}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1 sm:px-1.5 min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center bg-red-500 text-white border-0 text-[10px] sm:text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>

          <Avatar className="border-2 border-blue-500 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
            <AvatarFallback className="bg-blue-600 text-white text-xs sm:text-sm">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
