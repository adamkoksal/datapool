export const sqlQuery = `SELECT TOP 10
Person.Person.BusinessEntityID, Person.Person.Title, Person.Person.FirstName, Person.Person.MiddleName, Person.Person.LastName,
Person.Address.AddressLine1, Person.Address.AddressLine2, Person.Address.City, Person.Address.PostalCode, 
AddressType.Name AS AddressType, 
StateProvince.StateProvinceCode, StateProvince.CountryRegionCode, StateProvince.Name AS StateName,
PersonPhone.PhoneNumber, PhoneNumberType.Name AS PhoneType
FROM Person.Person
JOIN Person.BusinessEntityAddress
ON BusinessEntityAddress.BusinessEntityID = Person.BusinessEntityID
JOIN Person.Address
ON BusinessEntityAddress.AddressID = Address.AddressID
JOIN Person.AddressType
ON AddressType.AddressTypeID = BusinessEntityAddress.AddressTypeID
JOIN Person.StateProvince
ON Address.StateProvinceID = StateProvince.StateProvinceID
JOIN Person.PersonPhone
ON PersonPhone.BusinessEntityID = Person.BusinessEntityID
JOIN Person.PhoneNumberType
ON PhoneNumberType.PhoneNumberTypeID = PersonPhone.PhoneNumberTypeID`;
