import { jsPDF } from "jspdf";

export function generateReceipt(data: {
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  transactionId: string;
  date: string;
}) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("Mahila Swashth Mission", 105, 20, { align: "center" });

  doc.setFontSize(16);
  doc.text("Donation Receipt", 105, 30, { align: "center" });

  // Receipt details
  doc.setFontSize(12);
  doc.text(`Receipt Date: ${data.date}`, 20, 50);
  doc.text(`Transaction ID: ${data.transactionId}`, 20, 60);

  doc.text("Donor Information:", 20, 80);
  doc.setFontSize(11);
  doc.text(`Name: ${data.donorName}`, 20, 90);
  doc.text(`Email: ${data.email}`, 20, 100);
  doc.text(`Phone: ${data.phone}`, 20, 110);

  doc.setFontSize(12);
  doc.text("Donation Details:", 20, 130);
  doc.setFontSize(14);
  doc.text(`Amount: ₹${data.amount.toLocaleString("en-IN")}`, 20, 140);

  // Footer
  doc.setFontSize(10);
  doc.text("Thank you for your generous donation!", 105, 170, { align: "center" });
  doc.text("This receipt is computer generated and does not require a signature.", 105, 180, {
    align: "center",
  });

  return doc.output("arraybuffer");
}
