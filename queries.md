# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT ProductName, CategoryId 
FROM Products;

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT o.OrderId, o.ShipperId, o.orderDate, s.shipperName
FROM Orders as o
JOIN Shippers as s on o.shipperId = s.shipperId
WHERE o.orderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT od.Quantity, p.ProductName FROM Orders as o
JOIN OrderDetails as od on o.orderId = od.orderId
JOIN Products as p on od.productId = p.productId
WHERE o.orderId = 10251

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT o.OrderId, c.CustomerName, e.lastName as EmployeeLastName FROM Orders as o
JOIN employees as e on o.employeeId = e.employeeId
JOIN customers as c on o.customerId = c.customerId

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT c.categoryName, COUNT(c.categoryId) as Count FROM Products as p
JOIN categories as c on c.categoryId = p.categoryId
GROUP BY c.categoryId

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT o.Orderid, o.quantity as ItemCount, SUM(o.quantity) as TotalOrders
from orderdetails as o
GROUP BY o.orderId
