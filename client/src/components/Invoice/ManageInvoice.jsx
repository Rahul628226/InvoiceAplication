import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Paper, Button, Box } from '@mui/material';
import './InvoiceTable.css';
import { Delete } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PDFInvoice from './PrintInvoice';

const InvoiceTable = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchInvoices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/invoices');
            setInvoices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleDeleteInvoice = async (invoiceId) => {
        try {
            await axios.delete(`http://localhost:8080/api/invoices/${invoiceId}`);
            fetchInvoices();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrintInvoice = (invoice) => {
        const pdfDocument = <PDFInvoice invoice={invoice} />;
        const blob = new Blob([pdfDocument], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
      };

    const indexOfLastInvoice = currentPage * rowsPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - rowsPerPage;
    const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    return (
        <div className="invoice-table-container">
            <h3>Invoice Table</h3>
            <TableContainer component={Paper} className="invoice-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentInvoices.map((invoice) => (
                            <TableRow key={invoice._id}>
                                <TableCell>{invoice.firstName}</TableCell>
                                <TableCell>
                                    {invoice.products.map((product) => (
                                        <div key={product._id}>{product.PName}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {invoice.products.map((product) => (
                                        <div key={product._id}>{product.quantity}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {invoice.products.map((product) => (
                                        <div key={product._id}>{product.price}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {invoice.products.map((product) => (
                                        <div key={product._id}>{product.totalPrice}</div>
                                    ))}
                                </TableCell>


                                <TableCell>
                                    {/* Add the PDFDownloadLink to generate and download the PDF */}
                                    {invoice && (
                                        <PDFDownloadLink
                                            document={<PDFInvoice invoice={invoice} />}
                                            fileName={`invoice_${invoice._id}.pdf`}
                                        >
                                            {({ blob, url, loading, error }) => (
                                                loading ? 'Loading document...' : <Button onClick={() => handlePrintInvoice(invoice)}>Print</Button>
                                            )}
                                        </PDFDownloadLink>
                                    )}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    disabled={indexOfLastInvoice >= invoices.length}
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </Box>
        </div>
    );
};

export default InvoiceTable;
