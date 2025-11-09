import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, MapPin, Users, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Notification {
  id: string;
  type: 'congestion' | 'responder' | 'route' | 'alert';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearNotification: (id: string) => void;
}

export function NotificationPanel({ 
  isOpen, 
  onClose, 
  notifications,
  onClearNotification 
}: NotificationPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'congestion':
        return AlertCircle;
      case 'responder':
        return Users;
      case 'route':
        return Navigation;
      default:
        return MapPin;
    }
  };

  const getColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-950 border-red-800';
      case 'medium':
        return 'text-yellow-400 bg-yellow-950 border-yellow-800';
      default:
        return 'text-blue-400 bg-blue-950 border-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-zinc-900 border-l border-slate-300 dark:border-zinc-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-300 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-slate-900 dark:text-white">Notifications</h2>
                <p className="text-sm text-slate-600 dark:text-zinc-400">{notifications.length} unread</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Notifications List */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-400 dark:text-zinc-700 mx-auto mb-3" />
                    <p className="text-slate-600 dark:text-zinc-500">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                      >
                        <Card className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded ${getColor(notification.priority)}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm text-slate-900 dark:text-white">{notification.title}</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white -mt-1"
                                  onClick={() => onClearNotification(notification.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-zinc-400 mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 dark:text-zinc-500">{notification.time}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getColor(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
