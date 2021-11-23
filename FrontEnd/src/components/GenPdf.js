import jsPDF from "jspdf";
import "jspdf-autotable";
import { parseISO } from "date-fns";
import { format } from "date-fns";

const generatePDF = (tickets) => {
  const doc = new jsPDF();

  const tableColumn = ["Id", "Date", "Category", "Description", "Amount"];
  const tableRows = [];

  tickets.map((data) => {
    const ticketData = [
      data._id.slice(0, 8),
      (data.date = format(parseISO(data.date), "dd/MM/yyyy")),
      data.category,
      data.description,
      data.amount,
    ];
    return tableRows.push(ticketData);
  });
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.text("Transactions ", 14, 15);
  doc.save(`Transactions.pdf`);
};

export default generatePDF;
