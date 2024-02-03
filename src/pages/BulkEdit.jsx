import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkList } from "../redux/updateBulk";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import { updateAll } from "../redux/invoicesSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";

function InvoiceBulkEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const bulk = useSelector(bulkList);
    const [bulkData, setBulkData] = useState([...bulk]);
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);

    const handleInputChange = (index, field, value) => {
        setBulkData(bulkData.map((item, i) => {
            if (i === index) {
                return handleCalculateTotal({
                    ...item,
                    [field]: value,
                });
            }
            return item;
        }));
    };

    const handleInputItem = (index, field, value) => {
        setItems(items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    [field]: value
                };
            }
            return item;
        }));
    }


    const handleCalculateTotal = (invoice) => {

        let subTotal = 0;

        invoice.items.forEach((item) => {
            subTotal +=
                parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
        });

        const taxAmount = parseFloat(
            subTotal * (invoice.taxRate / 100)
        ).toFixed(2);
        const discountAmount = parseFloat(
            subTotal * (invoice.discountRate / 100)
        ).toFixed(2);
        const total = (
            subTotal -
            parseFloat(discountAmount) +
            parseFloat(taxAmount)
        ).toFixed(2);

        return {
            ...invoice,
            subTotal: parseFloat(subTotal).toFixed(2),
            taxAmount,
            discountAmount,
            total,
        };
    };

    const handleItemSave = (id) => {
        setBulkData(bulkData.map((item) => {
            if (item.id === id) {
                return handleCalculateTotal({
                    ...item,
                    items,
                });
            }
            return item;
        }));
        setShow(false);
        setItems([]);
    };

    const deleteItem = (i) => {
        let item = [...items];

        item.splice(i, 1)

        setItems(item)
    }

    const handleUpdateAll = () => {
        dispatch(updateAll(bulkData));
        navigate("/");
    };

    return (
        bulkData.length ? (
            <>
                <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
                <Card className="d-flex p-3 p-md-4 p-sm-3">
                    <div className=" d-flex justify-content-between ">
                        <p className="fw-bold fs-3 ">Bulk Edit</p>
                        <Button
                            variant="primary mb-2 mb-md-4"
                            className=" px-4"
                            onClick={handleUpdateAll}
                        >
                            Update All
                        </Button>
                    </div>
                    <Table responsive bordered hover className=" text-center ">
                        <thead>
                            <tr>
                                <th className="">Invoice No</th>
                                <th>Due Date</th>
                                <th colSpan={3}>Bill To</th>
                                <th colSpan={3}>Bill From</th>
                                <th>Items</th>
                                <th>Currency</th>
                                <th>Tax Rate</th>
                                <th>Discount Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bulkData.map((invoice, index) => (
                                <tr key={invoice.id}>
                                    <td className=" p-0 ">
                                        <Form.Control
                                            className=" text-center bg-white "
                                            type="text"
                                            value={invoice.invoiceNumber}
                                            name="invoiceNumber"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "invoiceNumber",
                                                    +e.target.value
                                                )
                                            }
                                            placeholder="invoice no"
                                            min="1"

                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            className=" text-center bg-white"
                                            type="date"
                                            value={invoice.dateOfIssue}
                                            name="dateOfIssue"
                                            onChange={(e) =>
                                                handleInputChange(index, "dateOfIssue", e.target.value)
                                            }
                                            required
                                        />
                                    </td>
                                    <td className="p-0">
                                        <Form.Control
                                            type="text"
                                            className=" text-center bg-white"
                                            value={invoice.billTo}
                                            name="billTo"
                                            onChange={(e) =>
                                                handleInputChange(index, "billTo", e.target.value)
                                            }
                                            placeholder="name"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="email"
                                            className=" text-center bg-white"
                                            value={invoice.billToEmail}
                                            name="billToEmail"
                                            onChange={(e) =>
                                                handleInputChange(index, "billToEmail", e.target.value)
                                            }
                                            placeholder="email"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="text"
                                            className=" text-center bg-white"
                                            value={invoice.billToAddress}
                                            name="billToAddress"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "billToAddress",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="address"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="text"
                                            className=" text-center bg-white"
                                            value={invoice.billFrom}
                                            name="billFrom"
                                            onChange={(e) =>
                                                handleInputChange(index, "billFrom", e.target.value)
                                            }
                                            required
                                            placeholder="name"
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="email"
                                            className=" text-center bg-white"
                                            value={invoice.billFromEmail}
                                            name="billFromEmail"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "billFromEmail",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="email"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="text"
                                            className=" text-center bg-white"
                                            value={invoice.billFromAddress}
                                            name="billFromAddress"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "billFromAddress",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="address"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0 d-flex align-items-center px-2">
                                        <Form.Control
                                            type="text"
                                            className=" text-center bg-white"
                                            value={invoice.items.length}
                                            name="items"
                                            required
                                        />
                                        <Button
                                            variant="outline-primary"
                                            className=" p-1 "
                                            onClick={() => {
                                                setItems(invoice.items);
                                                setShow(true);
                                            }}
                                        >
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <BiSolidPencil />
                                            </div>
                                        </Button>
                                        <Modal show={show}>
                                            <Modal.Header
                                                closeButton
                                                onClick={() => {
                                                    setShow(false);
                                                }}
                                            >
                                                <Modal.Title>Items</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <div className=" d-flex gap-2 align-items-center justify-content-between ">
                                                    <h5 className=" m-auto "> Name</h5>
                                                    <h5 className=" m-auto ">Description</h5>
                                                    <h5 className=" m-auto ">Quantity</h5>
                                                    <h5 className=" m-auto ">Price</h5>
                                                    <h5 className=" m-auto ">Actions</h5>
                                                </div>
                                                {items.map((item, i) => (
                                                    <div
                                                        className=" d-flex gap-2 align-items-center mt-2 "
                                                        key={i}
                                                    >
                                                        <Form.Control
                                                            style={{ border: "1px solid gainsboro" }}
                                                            type="text"
                                                            className=" text-center"
                                                            value={item.itemName}
                                                            name="itemName"
                                                            onChange={(e) =>
                                                                handleInputItem(i, "itemName", e.target.value)
                                                            }
                                                            placeholder="item name"
                                                            required
                                                        />
                                                        <Form.Control
                                                            style={{ border: "1px solid gainsboro" }}
                                                            type="text"
                                                            className=" text-center"
                                                            value={item.itemDescription}
                                                            name="itemDescription"
                                                            onChange={(e) =>
                                                                handleInputItem(
                                                                    i,
                                                                    "itemDescription",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="item description"
                                                            required
                                                        />
                                                        <Form.Control
                                                            style={{ border: "1px solid gainsboro" }}
                                                            type="number"
                                                            className=" text-center"
                                                            value={item.itemQuantity}
                                                            name="itemQuantity"
                                                            onChange={(e) =>
                                                                handleInputItem(
                                                                    i,
                                                                    "itemQuantity",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="item quantity"
                                                            required
                                                        />
                                                        <Form.Control
                                                            style={{ border: "1px solid gainsboro" }}
                                                            type="number"
                                                            className=" text-center"
                                                            value={item.itemPrice}
                                                            name="itemPrice"
                                                            onChange={(e) =>
                                                                handleInputItem(i, "itemPrice", e.target.value)
                                                            }
                                                            placeholder="item price"
                                                            required
                                                        />
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => deleteItem(i)}
                                                            className="d-flex align-items-center justify-content-center gap-2"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                ))}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleItemSave(invoice.id)}
                                                >
                                                    Save
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                    <td className=" p-0">
                                        <Form.Select
                                            name="currency"
                                            value={invoice.currency}
                                            onChange={(e) =>
                                                handleInputChange(index, "currency", e.target.value)
                                            }
                                            className="text-center rounded-0 "
                                            aria-label="Change Currency"
                                        >
                                            <option value="$">USD (United States Dollar)</option>
                                            <option value="£">GBP (British Pound Sterling)</option>
                                            <option value="¥">JPY (Japanese Yen)</option>
                                            <option value="$">CAD (Canadian Dollar)</option>
                                            <option value="$">AUD (Australian Dollar)</option>
                                            <option value="$">SGD (Singapore Dollar)</option>
                                            <option value="¥">CNY (Chinese Renminbi)</option>
                                            <option value="₿">BTC (Bitcoin)</option>
                                        </Form.Select>
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="number"
                                            className=" text-center bg-white"
                                            value={invoice.taxRate}
                                            name="taxRate"
                                            onChange={(e) =>
                                                handleInputChange(index, "taxRate", e.target.value)
                                            }
                                            placeholder="0.0 %"
                                            required
                                        />
                                    </td>
                                    <td className=" p-0">
                                        <Form.Control
                                            type="number"
                                            className=" text-center bg-white"
                                            value={invoice.discountRate}
                                            name="discountRate"
                                            onChange={(e) =>
                                                handleInputChange(index, "discountRate", e.target.value)
                                            }
                                            placeholder="0.0 %"
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </>
        ) : (
            <div>
                Select something!
            </div>
        )
    );
}

export default InvoiceBulkEdit;