import { useState } from 'react';
import { FileText, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

export function IncidentReportForm() {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    severity: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Incident report submitted successfully', {
      description: `${formData.type} at ${formData.location}`,
    });
    setFormData({ type: '', location: '', severity: '', description: '' });
  };

  return (
    <Card className="bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-400" />
        <h3 className="text-slate-900 dark:text-white">Incident Report</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="incident-type" className="text-slate-700 dark:text-zinc-300">Incident Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="incident-type" className="bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700">
              <SelectItem value="medical">Medical Emergency</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="accident">Traffic Accident</SelectItem>
              <SelectItem value="hazard">Road Hazard</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-slate-700 dark:text-zinc-300">Location</Label>
          <Input
            id="location"
            placeholder="Enter address or coordinates"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity" className="text-slate-700 dark:text-zinc-300">Severity</Label>
          <Select
            value={formData.severity}
            onValueChange={(value) => setFormData({ ...formData, severity: value })}
          >
            <SelectTrigger id="severity" className="bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700">
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-700 dark:text-zinc-300">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter incident details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </Button>
      </form>
    </Card>
  );
}
