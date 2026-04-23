'use client'

import { Button } from "@/components/ui/button"
import { FileTextIcon } from "lucide-react"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExportPDFButton({ data, churchName }: { data: any[], churchName: string }) {
  const exportToPDF = () => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF();
    const tableColumn = ["Name", "Contact", "Ministry", "Family Group", "Status"];
    const tableRows = data.map(m => [
      m.name,
      m.contact || "-",
      m.ministry || "-",
      m.family_group || "-",
      m.status || "Active"
    ]);

    // Header styling
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // Dark blue
    doc.text(churchName || "Mahayahay Free Methodist Church", 14, 22);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text("Official Member Directory Report", 14, 32);
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Light gray
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, 38);

    // Generate Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'striped',
      headStyles: { 
        fillColor: [30, 58, 138], 
        textColor: [255, 255, 255], 
        fontStyle: 'bold',
        halign: 'left'
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [30, 58, 138] }, // Name column
      },
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        overflow: 'linebreak'
      },
      margin: { top: 45, left: 14, right: 14 },
      didDrawPage: (dataArg) => {
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${dataArg.pageNumber}`,
          dataArg.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      }
    });

    doc.save(`Member_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Button variant="outline" size="sm" onClick={exportToPDF} className="text-red-600 border-red-200 hover:bg-red-50 font-bold">
      <FileTextIcon className="w-4 h-4 mr-2" /> Download PDF
    </Button>
  );
}
