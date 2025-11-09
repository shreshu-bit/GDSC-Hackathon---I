import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Menu, FileText } from 'lucide-react';
import { TopNav } from './components/TopNav';
import { MapView } from './components/MapView';
import { ControlPanel } from './components/ControlPanel';
import { IncidentReportForm } from './components/IncidentReportForm';
import { LiveChat } from './components/LiveChat';
import { StatsBar } from './components/StatsBar';
import { NotificationPanel } from './components/NotificationPanel';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './components/ui/sheet';
import { ThemeProvider } from './components/ThemeProvider';

interface Notification {
  id: string;
  type: 'congestion' | 'responder' | 'route' | 'alert';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

export default function App() {
  const [overrideActive, setOverrideActive] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const [incidentReportOpen, setIncidentReportOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'congestion',
      title: 'Heavy Traffic Detected',
      message: 'Main St experiencing heavy congestion. Consider Route B for A-01.',
      time: '2 min ago',
      priority: 'high',
    },
    {
      id: '2',
      type: 'responder',
      title: 'Nearby Unit Available',
      message: 'A-03 is now available 1.2 mi from incident location.',
      time: '5 min ago',
      priority: 'medium',
    },
    {
      id: '3',
      type: 'route',
      title: 'Route Updated',
      message: 'Optimal route recalculated for F-01. ETA reduced by 2 minutes.',
      time: '8 min ago',
      priority: 'low',
    },
    {
      id: '4',
      type: 'alert',
      title: 'Road Hazard Reported',
      message: 'Construction zone on 5th Ave. Update routes accordingly.',
      time: '12 min ago',
      priority: 'medium',
    },
  ]);

  const handleToggleOverride = () => {
    setOverrideActive(!overrideActive);
  };

  const handleClearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-white dark:bg-zinc-950">
        <TopNav 
          onNotificationsClick={() => setNotificationsPanelOpen(true)}
          unreadCount={notifications.length}
        />

      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Map Section */}
          <div className="flex-1 p-3 sm:p-4 md:p-6 min-h-0 relative">
            <MapView overrideActive={overrideActive} />
            
            {/* Mobile Control Panel Button */}
            <div className="absolute top-6 right-6 lg:hidden z-20">
              <Sheet open={controlPanelOpen} onOpenChange={setControlPanelOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-96 p-0 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
                  <ControlPanel 
                    overrideActive={overrideActive}
                    onToggleOverride={handleToggleOverride}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <StatsBar />
        </div>

        {/* Right Control Panel - Desktop only */}
        <div className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-l border-slate-300 dark:border-zinc-800">
          <ControlPanel 
            overrideActive={overrideActive}
            onToggleOverride={handleToggleOverride}
          />
        </div>
      </div>

      {/* Bottom Panel Toggle Button */}
      {!bottomPanelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 sm:bottom-24 md:bottom-32 left-1/2 transform -translate-x-1/2 z-30"
        >
          <Button
            onClick={() => setBottomPanelOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg text-xs sm:text-sm"
            size="sm"
          >
            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Show Chat
          </Button>
        </motion.div>
      )}
      
      {bottomPanelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-[40vh] sm:bottom-[45vh] md:bottom-[400px] left-1/2 transform -translate-x-1/2 z-30"
        >
          <Button
            onClick={() => setBottomPanelOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg text-xs sm:text-sm"
            size="sm"
          >
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Hide Panel</span>
            <span className="sm:hidden">Hide</span>
          </Button>
        </motion.div>
      )}

      {/* Bottom Panel for Forms and Chat */}
      <AnimatePresence>
        {bottomPanelOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-[40vh] sm:h-[45vh] md:h-96 border-t border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <div className="h-full flex flex-col">
              <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 pb-2 border-b border-slate-300 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <h3 className="text-slate-900 dark:text-white">Live Chat</h3>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden p-3 sm:p-4 md:p-6">
                <LiveChat />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        notifications={notifications}
        onClearNotification={handleClearNotification}
      />

      {/* Floating Incident Report Button - Right side */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed right-6 bottom-24 z-40"
      >
        <Sheet open={incidentReportOpen} onOpenChange={setIncidentReportOpen}>
          <SheetTrigger asChild>
            <Button 
              className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
              size="icon"
            >
              <FileText className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[90vw] sm:w-[450px] p-0 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 overflow-y-auto"
          >
            <SheetTitle className="sr-only">Incident Report Form</SheetTitle>
            <SheetDescription className="sr-only">
              Submit a new incident report with details about the emergency situation
            </SheetDescription>
            <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-800 p-4 sm:p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 dark:text-white">Incident Report</h2>
                    <p className="text-xs text-slate-600 dark:text-zinc-400">Submit a new incident</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <IncidentReportForm />
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}