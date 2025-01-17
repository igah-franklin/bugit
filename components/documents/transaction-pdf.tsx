import { Document, Page, View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  pageTitle: {
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderColor: '#333',
    borderWidth: 0.5,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    // borderBottomColor: '#333',
    // borderBottomWidth: 1,
    // minHeight: 40,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    padding: 8,
    color: '#000',
    borderWidth: 0.5,
  },
  category: {
    width: '20%',
  },
  description: {
    width: '30%',
  },
  type: {
    width: '15%',
  },
  amount: {
    width: '20%',
  },
  date: {
    width: '15%',
  },
  income: {
    color: '#4ade80',
  },
  expense: {
    color: '#ef4444',
  },
});

// Transaction Data
const transactions = [
  { category: 'Salary', description: 'Monthly Salary', type: 'Income', amount: '$5,000.00', date: '01/01/2023' },
  { category: 'Rent', description: 'Monthly Rent', type: 'Expense', amount: '$1,500.00', date: '01/05/2023' },
  { category: 'Groceries', description: 'Weekly Groceries', type: 'Expense', amount: '$200.00', date: '01/10/2023' },
  { category: 'Freelance', description: 'Web Development Project Web Development Project Web Development Project', type: 'Income', amount: '$1,000.00', date: '01/15/2023' },
];

// PDF Document Component
const TransactionPDF = () => (
  <Document>
    <Page size="A3" style={styles.page}>
      <View style={styles.pageTitle}>
        <Text>Financial Transactions from 12/02/24 - 01/03/25</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.category, { fontWeight: 'bold', fontSize: 15}]}>Category</Text>
          <Text style={[styles.tableCell, styles.description, { fontWeight: 'bold', fontSize: 15}]}>Description</Text>
          <Text style={[styles.tableCell, styles.type, { fontWeight: 'bold', fontSize: 15}]}>Type</Text>
          <Text style={[styles.tableCell, styles.amount, { fontWeight: 'bold', fontSize: 15}]}>Amount</Text>
          <Text style={[styles.tableCell, styles.date, { fontWeight: 'bold', fontSize: 15}]}>Date</Text>
        </View>
        {transactions.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.category]}>{item.category}</Text>
            <Text style={[styles.tableCell, styles.description]}>{item.description}</Text>
            <Text
              style={[
                styles.tableCell,
                styles.type,
                item.type === 'Income' ? styles.income : styles.expense,
              ]}
            >
              {item.type}
            </Text>
            <Text style={[styles.tableCell, styles.amount]}>{item.amount}</Text>
            <Text style={[styles.tableCell, styles.date]}>{item.date}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);


const downloadCSV = () => {
  const headers = ['Category', 'Description', 'Type', 'Amount', 'Date'];
  const rows = transactions.map((item) =>
    [item.category, item.description, item.type, item.amount, item.date].join(',')
  );
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'financial-report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const DownloadCsv = ()=>{
  return (
    <button
      onClick={downloadCSV}
      className="flex items-center gap-2 bg-blue-900/20 hover:bg-blue-900/30 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <Download className="w-4 h-4" />
      Download CSV
    </button>
  )
}

// Download Component
export const DownloadPdf = () => {
  return (
      <PDFDownloadLink
        document={<TransactionPDF />}
        fileName="financial-report.pdf"
        className="flex items-center hover:bg-foreground/10 gap-2 text-white px-4 py-2 rounded-lg transition-colors my-2"
      >
        {/* {({ loading }) => (
          <>
            <Download className="w-4 h-4" />
            {loading ? 'Loading...' : 'Download PDF'}
          </>
        )} */}
        <Download className="w-4 h-4" />Download PDF
      </PDFDownloadLink>
  );
};

export default DownloadPdf;
