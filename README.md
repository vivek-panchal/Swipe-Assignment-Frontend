# Swipe Assignment
Deployed link - https://swipe-assignment-frontend-two.vercel.app/


### Try on your Machine
#### Clone
```bash
git clone https://github.com/vivek-panchal/Swipe-Assignment-Frontend
```
#### Navigate to the Project directory
```bash
cd swipe-assignment-frontend
````
#### Install Dependencies
```bash
npm i
```
#### Run Project
```bash
npm start
```



### Features Added

#### Bulk Edit

1. A bulk edit button has been added to InvoiceList Page.
2. This button redirects to a new component BulkEditModal which lets user choose which invoices to edit.
3. Once user clicks continue they go to a new page BulkEdit.jsx where they can edit invoices in bulk in excel like format.



1. Fixed the issue where taxAmount and discountAmount were not displayed after clicking on the eye icon on landing page.
2. Fixed the issue where editing individual invoice did not actually edit the invoice.
