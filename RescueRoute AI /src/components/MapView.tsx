import { motion } from 'motion/react';
import { Ambulance, Flame, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Vehicle {
  id: string;
  type: 'ambulance' | 'firetruck';
  position: { x: number; y: number };
  status: 'responding' | 'available' | 'enroute';
  destination?: { x: number; y: number };
}

interface Hazard {
  id: string;
  position: { x: number; y: number };
  type: string;
}

interface MapViewProps {
  overrideActive: boolean;
}

export function MapView({ overrideActive }: MapViewProps) {
  const [vehicles] = useState<Vehicle[]>([
    { id: 'A-01', type: 'ambulance', position: { x: 25, y: 40 }, status: 'responding', destination: { x: 70, y: 60 } },
    { id: 'A-02', type: 'ambulance', position: { x: 60, y: 25 }, status: 'enroute', destination: { x: 60, y: 70 } },
    { id: 'F-01', type: 'firetruck', position: { x: 45, y: 70 }, status: 'available' },
  ]);

  const [hazards] = useState<Hazard[]>([
    { id: 'H-1', position: { x: 35, y: 55 }, type: 'Accident' },
    { id: 'H-2', position: { x: 75, y: 40 }, type: 'Construction' },
  ]);

  return (
    <div className="relative w-full h-full bg-slate-200 dark:bg-zinc-950 rounded-lg overflow-hidden">
      {/* Google Maps Embed Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6727.058562559525!2d-92.07662742411866!3d32.53871677376417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x862e460c333ad88f%3A0xac2e5eae259bd742!2s1715%20University%20Ave%2C%20Monroe%2C%20LA%2071203!5e0!3m2!1sen!2sus!4v1762621917402!5m2!1sen!2sus"
          className="w-full h-full rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Overlay for better contrast and visibility of icons */}
      <div className="absolute inset-0 bg-white/20 dark:bg-zinc-950/40 pointer-events-none"></div>

      {/* Route paths */}
      {vehicles.filter(v => v.destination).map(vehicle => (
        <svg key={`route-${vehicle.id}`} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d={`M ${vehicle.position.x}% ${vehicle.position.y}% L ${vehicle.destination!.x}% ${vehicle.destination!.y}%`}
            stroke={vehicle.type === 'ambulance' ? '#ef4444' : '#f97316'}
            strokeWidth="3"
            strokeDasharray="8 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1 }}
          />
        </svg>
      ))}

      {/* Hazards */}
      {hazards.map(hazard => (
        <motion.div
          key={hazard.id}
          className="absolute"
          style={{ 
            left: `${hazard.position.x}%`, 
            top: `${hazard.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500 whitespace-nowrap">
              {hazard.type}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Vehicles */}
      {vehicles.map(vehicle => (
        <motion.div
          key={vehicle.id}
          className="absolute"
          style={{ 
            left: `${vehicle.position.x}%`, 
            top: `${vehicle.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={vehicle.status === 'responding' ? {
            scale: [1, 1.15, 1],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="relative">
            <div className={`p-2 rounded-full ${
              vehicle.type === 'ambulance' ? 'bg-red-600' : 'bg-orange-600'
            } border-2 border-white shadow-lg`}>
              {vehicle.type === 'ambulance' ? (
                <Ambulance className="w-5 h-5 text-white" />
              ) : (
                <Flame className="w-5 h-5 text-white" />
              )}
            </div>
            
            {vehicle.status === 'responding' && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: vehicle.type === 'ambulance' ? 
                    'rgba(239, 68, 68, 0.4)' : 'rgba(249, 115, 22, 0.4)'
                }}
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white dark:bg-zinc-900 px-2 py-1 rounded text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 shadow-lg">
                {vehicle.id}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur p-4 rounded-lg border border-slate-300 dark:border-zinc-800">
        <p className="text-xs text-slate-600 dark:text-zinc-400 mb-2">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-red-600 border border-white">
              <Ambulance className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-900 dark:text-white">Ambulance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-orange-600 border border-white">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-900 dark:text-white">Fire Truck</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-yellow-500" />
            <span className="text-xs text-slate-900 dark:text-white">Hazard</span>
          </div>
        </div>
      </div>
    </div>
  );
}