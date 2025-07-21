import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Mail, User, Wallet } from "lucide-react";
import { IUserInfo } from "@/interfaces/user.interface";
import { formatNumber } from "@/utils/formatNumber";

interface UserInfoProps {
  user: IUserInfo;
}
export default function UserInfo({ user }: UserInfoProps) {
  return (
    <Card className="shadow-md rounded-2xl border border-muted">
      <CardHeader>
        <CardTitle className="text-xl">User Info</CardTitle>
        <CardDescription className="text-muted-foreground">
          Welcome, <span className="font-medium">{user.name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-3">
          <Mail className="text-muted-foreground h-5 w-5" />
          <div>
            <Label className="text-sm">Email</Label>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-muted-foreground h-5 w-5" />
          <div>
            <Label className="text-sm">Username</Label>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wallet className="text-muted-foreground h-5 w-5" />
          <div>
            <Label className="text-sm">Wallet Balance</Label>
            <p className="text-sm text-muted-foreground">
              {user?.wallet?.balance && formatNumber(user?.wallet?.balance)}{" "}
              {user?.wallet?.currency}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
