import jsPDF from "jspdf";
import "jspdf-autotable";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { useState } from "react";
const generatePDF = (tickets, Balance) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Id",
    "Date",
    "Category",
    "Description",
    "Type",
    "Amount",
    "Balance",
  ];
  const tableRows = [];

  var balance = 0;
  tickets.forEach((data) => {
    {
      data.type === "CREDIT"
        ? (balance = balance + data.amount)
        : (balance = balance - data.amount);
    }
    const ticketData = [
      data._id.slice(0, 8),
      (data.date = format(parseISO(data.date), "dd/MM/yyyy")),
      data.category,
      data.description,
      data.type,
      data.amount,
      balance,
    ];
    return tableRows.push(ticketData);
  });
  const lastRow = ["Total Balance", "", "", "", "", "", Balance];
  tableRows.push(lastRow);

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.text("Transactions ", 14, 15);
  doc.save(`Transactions.pdf`);
};

export default generatePDF;
