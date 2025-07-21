"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Withdraw from "@/components/home/Withdraw";
import Deposit from "@/components/home/Deposit";
import UserInfo from "@/components/home/UserInfo";
import { useUserStore } from "@/stores/user/user.modal";

function HomeViews() {
  const { user, refetch } = useUserStore();
  console.log({ user });

  const currencies = ["USD", "THB", "EUR", "JPY", "BTC"];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Service A Frontend
      </h1>

      <UserInfo user={user} />

      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* Deposit */}
        <TabsContent value="deposit">
          <Deposit
            walletId={user?.wallet?.id || ""}
            currencies={currencies}
            refetch={refetch}
          />
        </TabsContent>

        {/* Withdraw */}
        <TabsContent value="withdraw">
          <Withdraw currencies={currencies} />
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Payment function here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HomeViews;
