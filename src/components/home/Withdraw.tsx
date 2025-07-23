import React, { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
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
import { useForm } from "react-hook-form";
import z, { object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { withdrawSchema } from "@/schema/withdraw.schema";
import { TransactionServices } from "@/app/api/transaction.api";
import { IResponse } from "@/interfaces/response.interface";
import { IWithdrawResponse } from "@/interfaces/transaction.interface";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CustomDialog } from "../common/CustomDialog";
import { ECurrency } from "@/enums/currency.enum";
import { formatNumber } from "@/utils/formatNumber";

interface WithdrawProps {
  walletId: string;
  currencies: ICurrency[];
  refetch: () => void;
}
function Withdraw({ walletId, currencies, refetch }: WithdrawProps) {
  const [open, setOpen] = React.useState(false);
  const [titleDialog, setTitleDialog] = React.useState("");
  const [descriptionDialog, setDescriptionDialog] = React.useState("");

  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
      currency: "",
      toUsername: "",
    },
  });

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const isValid = /^(\d+)?(\.\d{0,2})?$/.test(value) || value === "";

    if (isValid) {
      console.log("Valid:", value);
      form.setValue("amount", value);
    } else {
      console.log("Invalid input:", value);
    }
  };

  const onSubmit = async (values: z.infer<typeof withdrawSchema>) => {
    try {
      const response = (await TransactionServices.withdraw(walletId, {
        amount: Number(values.amount),
        currency: values.currency,
        toUsername: values.toUsername,
      })) as IResponse<IWithdrawResponse>;

      setOpen(true);
      if (response.data) {
        refetch();
        setTitleDialog("Withdraw Success ✅");
        setDescriptionDialog(
          `Withdraw successfully. amount : ${formatNumber(
            response.data.withdrawnAmount.toString()
          )} ${response.data.withdrawnCurrency}, to : ${values.toUsername} `
        );
        form.setValue("amount", "");
        form.clearErrors();
      } else {
        setTitleDialog("Withdraw Failed ❌");
        setDescriptionDialog("Something went wrong. Please try again.");
      }
    } catch (error) {
      setOpen(true);
      console.log(error);
      setTitleDialog("Withdraw Failed ❌");
      setDescriptionDialog("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <Card>
        <CardContent className="space-y-4 pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          {...field}
                          onChange={handleChangeAmount}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((item) => (
                            <SelectItem key={item.id} value={item.currency}>
                              {item.currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="toUsername"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter recipient username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit Withdraw
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title={titleDialog}
        description={descriptionDialog}
      />
    </>
  );
}

export default Withdraw;
