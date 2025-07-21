"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Withdraw from "@/components/home/Withdraw";
import Deposit from "@/components/home/Deposit";
import UserInfo from "@/components/home/UserInfo";
import { useUserStore } from "@/stores/user/user.modal";
import { useCurrencyStore } from "@/stores/currency/currency.modal";
import { CurrencyServices } from "@/app/api/currency.api";
import { ICurrency } from "@/interfaces/currency.interface";
import { IResponse } from "@/interfaces/response.interface";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function HomeViews() {
  const { user, refetch, reset } = useUserStore();
  const { currency, setCurrency } = useCurrencyStore();
  const router = useRouter();

  const fetchCurrency = async () => {
    try {
      const response = (await CurrencyServices.getCurrency()) as IResponse<
        ICurrency[]
      >;

      console.log(response);

      if (response.data) {
        setCurrency(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    reset();
    router.push("/");
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Service A Frontend</h1>
        <Button
          variant="destructive"
          className="cursor-pointer"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <UserInfo user={user} />

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* Deposit */}
        <TabsContent value="deposit">
          <Deposit
            walletId={user?.wallet?.id || ""}
            currencies={currency}
            refetch={refetch}
          />
        </TabsContent>

        {/* Withdraw */}
        <TabsContent value="withdraw">
          <Withdraw
            walletId={user?.wallet?.id || ""}
            currencies={currency}
            refetch={refetch}
          />
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
