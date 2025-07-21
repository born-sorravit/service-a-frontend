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
import { useForm } from "react-hook-form";
import z from "zod";
import { depositSchema } from "@/schema/deposit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TransactionServices } from "@/app/api/transaction.api";
import { IResponse } from "@/interfaces/response.interface";
import { CustomDialog } from "../common/CustomDialog";

interface DepositProps {
  walletId: string;
  currencies: string[];
  refetch: () => void;
}
function Deposit({ walletId, currencies, refetch }: DepositProps) {
  const [open, setOpen] = React.useState(false);
  const [titleDialog, setTitleDialog] = React.useState("");
  const [descriptionDialog, setDescriptionDialog] = React.useState("");

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      currency: "",
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
  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    try {
      const response = (await TransactionServices.deposit(walletId, {
        amount: Number(values.amount),
        currency: values.currency,
      })) as IResponse<unknown>;

      setOpen(true);
      if (response.data) {
        refetch();

        setTitleDialog("Deposit Success ✅");
        setDescriptionDialog("Deposit successfully");
        form.setValue("amount", "");
        form.clearErrors();
      } else {
        setTitleDialog("Deposit Failed ❌");
        setDescriptionDialog("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                Submit Deposit
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

export default Deposit;
