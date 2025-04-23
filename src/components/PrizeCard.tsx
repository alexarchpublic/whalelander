
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PrizeCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const PrizeCard = ({ title, description, imageUrl }: PrizeCardProps) => {
  return (
    <Card className="overflow-hidden border border-gold/20 hover:border-gold/40 transition-all">
      <CardHeader>
        <CardTitle className="font-playfair">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video mb-4 overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};
