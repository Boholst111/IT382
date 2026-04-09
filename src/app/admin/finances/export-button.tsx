'use client'

import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExportFinancesButton({ data }: { data: any[] }) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;
    
    const headers = ["Date", "Type", "Amount", "Description"];
    const rows = data.map(record => [
      new Date(record.date).toLocaleDateString(),
      record.type,
      record.amount,
      record.description || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FM-ChMS_Finances_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" size="sm" onClick={exportToCSV} className="text-blue-600 border-blue-200 hover:bg-blue-50">
      <DownloadIcon className="w-4 h-4 mr-2" /> Export CSV
    </Button>
  );
}
