
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event } from "../events/types";

interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface ActivityFeedProps {
  activities: Event[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn(
      "bg-gradient-to-b from-card to-card/90 rounded-xl shadow-sm border border-border/40 p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Activity Feed</h2>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-full bg-muted mt-2 group-hover:bg-primary/30 transition-colors duration-500"></div>
              )}
            </div>
            <div className="pb-4 group-hover:translate-x-1 transition-transform duration-300">
              <p className="text-sm text-muted-foreground">
                {new Date(activity.startDate).toISOString().split('T')[0]} - {new Date(activity.endDate).toISOString().split('T')[0]}
              </p>
              <p className="font-medium mt-0.5 group-hover:text-primary transition-colors duration-300">{activity.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
