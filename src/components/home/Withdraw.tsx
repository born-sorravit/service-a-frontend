import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ICurrency } from "@/interfaces/currency.interface";

interface WithdrawProps {
  currencies: ICurrency[];
}
function Withdraw({ currencies }: WithdrawProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <div className="space-y-2 w-full">
            <Label>Amount</Label>
            <Input type="number" placeholder="Enter amount" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((item) => (
                  <SelectItem key={item.id} value={item.currency}>
                    {item.currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>To Username</Label>
          <Input type="text" placeholder="Enter recipient username" />
        </div>

        <Button className="w-full">Submit Withdraw</Button>
      </CardContent>
    </Card>
  );
}

export default Withdraw;
