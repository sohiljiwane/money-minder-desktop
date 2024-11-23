import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "../../components/ui/card";
  import { DollarSign } from "lucide-react";

interface TileCardData {
    title: string,
    amount: string
}

const TileCard: React.FC<TileCardData> = ({ title, amount }) => {
    return (
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <DollarSign className="h-5 w-5" />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-600">
                  {amount}
                </p>
              </CardContent>
        </Card>
    );
}

export default TileCard;