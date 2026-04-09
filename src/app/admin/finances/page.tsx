import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { AddFinanceDialog } from "./client-components";
import { ExportFinancesButton } from "./export-button";

export default async function FinancesPage() {
  const supabase = createClient();
  const { data: records } = await supabase.from('finances').select('*').order('date', { ascending: false });

  const totalIncome = records?.filter(r => r.type !== 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
  const totalExpense = records?.filter(r => r.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Finances</h1>
        <div className="flex gap-2">
           <ExportFinancesButton data={records || []} />
           <AddFinanceDialog />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="border-0 shadow-sm bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Income</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Total Expenses</CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">${totalExpense.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm mt-6">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Date</TableHead>
                <TableHead className="font-semibold text-neutral-600">Type</TableHead>
                <TableHead className="font-semibold text-neutral-600">Description</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records && records.length > 0 ? records.map((record) => (
                <TableRow key={record.id} className="hover:bg-neutral-50/50">
                  <TableCell className="text-neutral-500 py-3 px-6">
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${record.type === 'expense' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                       {record.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-neutral-900">{record.description || "-"}</TableCell>
                  <TableCell className={`text-right px-6 font-bold ${record.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                    {record.type === 'expense' ? '-' : '+'}${Number(record.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={4} className="py-8 text-center text-neutral-500">No financial records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
