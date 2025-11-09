import { motion } from 'motion/react';
import { Ambulance, Flame, Clock, MapPin, AlertCircle, Route, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface ControlPanelProps {
  overrideActive: boolean;
  onToggleOverride: () => void;
}

const vehicles = [
  {
    id: 'A-01',
    type: 'ambulance',
    driver: 'Sarah Johnson',
    status: 'responding',
    eta: '4 min',
    location: '5th Ave & Main St',
    destination: 'Memorial Hospital',
    speed: '45 mph',
    distance: '2.8 mi',
  },
  {
    id: 'A-02',
    type: 'ambulance',
    driver: 'Mike Chen',
    status: 'enroute',
    eta: '8 min',
    location: 'Park Blvd',
    destination: 'City General',
    speed: '38 mph',
    distance: '4.2 mi',
  },
  {
    id: 'F-01',
    type: 'firetruck',
    driver: 'Tom Rodriguez',
    status: 'available',
    eta: '-',
    location: 'Station 12',
    destination: '-',
    speed: '0 mph',
    distance: '-',
  },
  {
    id: 'A-03',
    type: 'ambulance',
    driver: 'Emily Watson',
    status: 'responding',
    eta: '6 min',
    location: 'Broadway & 8th',
    destination: 'St. Mary\'s Hospital',
    speed: '42 mph',
    distance: '3.5 mi',
  },
  {
    id: 'F-02',
    type: 'firetruck',
    driver: 'James Wilson',
    status: 'enroute',
    eta: '10 min',
    location: 'Oak Street',
    destination: 'Industrial District',
    speed: '35 mph',
    distance: '5.1 mi',
  },
  {
    id: 'A-04',
    type: 'ambulance',
    driver: 'Lisa Martinez',
    status: 'available',
    eta: '-',
    location: 'Station 7',
    destination: '-',
    speed: '0 mph',
    distance: '-',
  },
];

const alternateRoutes = [
  { name: 'Route A', eta: '4 min', distance: '2.8 mi', traffic: 'light', recommended: true },
  { name: 'Route B', eta: '5 min', distance: '3.1 mi', traffic: 'moderate', recommended: false },
  { name: 'Route C', eta: '7 min', distance: '2.5 mi', traffic: 'heavy', recommended: false },
];

export function ControlPanel({ overrideActive, onToggleOverride }: ControlPanelProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 flex flex-col h-full">
      <div className="p-4 lg:p-6 border-b border-slate-300 dark:border-zinc-800">
        <h2 className="text-slate-900 dark:text-white mb-3 lg:mb-4 text-base lg:text-lg">Control Center</h2>
        
        <motion.div
          animate={overrideActive ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Button
            onClick={onToggleOverride}
            className={`w-full relative overflow-hidden ${
              overrideActive 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {overrideActive && (
              <motion.div
                className="absolute inset-0 bg-white"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <Zap className="w-4 h-4 mr-2" />
            {overrideActive ? 'Override Active' : 'Request Override'}
          </Button>
        </motion.div>
        
        {overrideActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 rounded-lg"
          >
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Traffic lights on route are now controlled. Emergency priority granted.
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-300 dark:border-zinc-800">
          <h3 className="text-xs lg:text-sm text-slate-600 dark:text-zinc-400 mb-2 lg:mb-3">Active Units</h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="px-4 lg:px-6 py-3 lg:py-4 space-y-2 lg:space-y-3">
            {vehicles.map(vehicle => (
              <Card key={vehicle.id} className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded ${
                      vehicle.type === 'ambulance' ? 'bg-red-600' : 'bg-orange-600'
                    }`}>
                      {vehicle.type === 'ambulance' ? (
                        <Ambulance className="w-4 h-4 text-white" />
                      ) : (
                        <Flame className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white">{vehicle.id}</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400">{vehicle.driver}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      vehicle.status === 'responding' 
                        ? 'bg-red-950 text-red-400 border-red-800'
                        : vehicle.status === 'enroute'
                        ? 'bg-yellow-950 text-yellow-400 border-yellow-800'
                        : 'bg-green-950 text-green-400 border-green-800'
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    <span>{vehicle.location}</span>
                  </div>
                  {vehicle.destination !== '-' && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                      <Route className="w-3 h-3" />
                      <span>→ {vehicle.destination}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Clock className="w-3 h-3" />
                      <span>ETA: {vehicle.eta}</span>
                    </div>
                    <div className="text-slate-600 dark:text-zinc-400">
                      {vehicle.speed} • {vehicle.distance}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 border-t border-slate-300 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
          {/* Alternate Routes */}
          <div>

            <h3 className="text-xs lg:text-sm text-slate-600 dark:text-zinc-400 mb-2 lg:mb-3">Route Suggestions (A-01)</h3>
            <div className="space-y-2">
              {alternateRoutes.map((route, idx) => (
                <Card 
                  key={idx}
                  className={`p-3 cursor-pointer transition-colors ${
                    route.recommended
                      ? 'bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900'
                      : 'bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-750'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-900 dark:text-white">{route.name}</span>
                    {route.recommended && (
                      <Badge className="bg-blue-600 text-white text-xs border-0">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
                    <span>{route.eta} • {route.distance}</span>
                    <span className={
                      route.traffic === 'light' ? 'text-green-400' :
                      route.traffic === 'moderate' ? 'text-yellow-400' :
                      'text-red-400'
                    }>
                      {route.traffic} traffic
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-300 dark:bg-zinc-800" />

          {/* Nearby Responders */}
          <div>
            <h3 className="text-xs lg:text-sm text-slate-600 dark:text-zinc-400 mb-2 lg:mb-3">Nearby Available Units</h3>
            <div className="space-y-2">
              <Card className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ambulance className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">A-05</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400">1.2 mi away</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-300 dark:border-zinc-600 text-slate-700 dark:text-zinc-300">
                    Dispatch
                  </Button>
                </div>
              </Card>
              <Card className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">F-03</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400">2.8 mi away</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-300 dark:border-zinc-600 text-slate-700 dark:text-zinc-300">
                    Dispatch
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
