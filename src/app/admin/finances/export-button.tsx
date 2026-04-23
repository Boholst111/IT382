'use client'

import { Button } from "@/components/ui/button"
import { FileTextIcon } from "lucide-react"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExportFinancesButton({ data }: { data: any[] }) {
  const exportToPDF = () => {
    if (!data || data.length === 0) return;
    
    const doc = new jsPDF();
    const tableColumn = ["Date", "Type", "Description", "Amount"];
    const tableRows = data.map(record => [
      new Date(record.date).toLocaleDateString(),
      record.type.toUpperCase(),
      record.description || "-",
      `PHP ${Number(record.amount).toLocaleString()}`
    ]);

    const totalIncome = data.filter(r => r.type !== 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalExpense = data.filter(r => r.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const balance = totalIncome - totalExpense;

    // PDF Header
    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138);
    doc.text("Mahayahay Free Methodist Church", 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("Official Financial Report", 14, 30);
    
    // Summary Box
    doc.setFillColor(245, 245, 245);
    doc.rect(14, 38, 182, 25, 'F');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Total Income: PHP ${totalIncome.toLocaleString()}`, 20, 48);
    doc.text(`Total Expenses: PHP ${totalExpense.toLocaleString()}`, 20, 54);
    doc.setFont("helvetica", "bold");
    doc.text(`Net Balance: PHP ${balance.toLocaleString()}`, 130, 52);
    doc.setFont("helvetica", "normal");

    // Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      theme: 'grid',
      headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
      didDrawPage: (dataArg) => {
        doc.setFontSize(8);
        doc.text(`Generated on ${new Date().toLocaleString()} - Page ${dataArg.pageNumber}`, 14, doc.internal.pageSize.height - 10);
      }
    });

    doc.save(`Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Button variant="outline" size="sm" onClick={exportToPDF} className="text-red-600 border-red-200 hover:bg-red-50 font-bold">
      <FileTextIcon className="w-4 h-4 mr-2" /> Download PDF
    </Button>
  );
}
