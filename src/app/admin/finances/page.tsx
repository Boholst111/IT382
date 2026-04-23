import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUpIcon, TrendingDownIcon, WalletIcon } from "lucide-react";
import { AddFinanceDialog, FinanceTimeFilter } from "./client-components";
import { ExportFinancesButton } from "./export-button";
import { Suspense } from "react";

export default async function FinancesPage({ searchParams }: { searchParams: { range?: string } }) {
  const supabase = createClient();
  const range = searchParams.range || 'all';
  
  let query = supabase.from('finances').select('*');
  
  const now = new Date();
  if (range === 'weekly') {
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    query = query.gte('date', lastWeek.toISOString());
  } else if (range === 'monthly') {
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);
    query = query.gte('date', lastMonth.toISOString());
  } else if (range === 'yearly') {
    const lastYear = new Date();
    lastYear.setFullYear(now.getFullYear() - 1);
    query = query.gte('date', lastYear.toISOString());
  }

  const { data: records } = await query.order('date', { ascending: false });

  const totalIncome = records?.filter(r => r.type !== 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
  const totalExpense = records?.filter(r => r.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
            <WalletIcon className="w-8 h-8 text-blue-600" />
            Finances
          </h1>
          <p className="text-neutral-500 font-medium">Tracking {range} financial records.</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <Suspense>
             <FinanceTimeFilter />
           </Suspense>
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
            <div className="text-2xl font-bold text-green-700">₱{totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Total Expenses</CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">₱{totalExpense.toLocaleString()}</div>
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
                    {record.type === 'expense' ? '-' : '+'}₱{Number(record.amount).toLocaleString()}
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
