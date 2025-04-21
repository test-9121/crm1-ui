
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardProps {
  label: string;
  count: number;
  color?: string;
}

export function OverviewCard({ label, count, color }: OverviewCardProps) {
  return (
    <Card className="w-full max-w-xs shadow-sm">
      <CardContent
        className="flex flex-col items-center justify-center p-5"
        style={{
          background: color
            ? `linear-gradient(90deg, ${color} 80%, #fff 10%)`
            : "linear-gradient(90deg, #22304a 80%, #fff 10%)",
        }}
      >
        <div className="text-3xl font-bold text-white mb-2">{count}</div>
        <div className="text-lg font-medium text-white/90">{label}</div>
      </CardContent>
    </Card>
  );
}
