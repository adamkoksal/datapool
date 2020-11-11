const { gql } = require("apollo-server");

export const typeDefs = gql`
  type Person {
    _id: String
    BusinessEntityID: String
    Title: String
    FirstName: String
    MiddleName: String
    LastName: String
    AddressLine1: String
    AddressLine2: String
    City: String
    PostalCode: String
    AddressType: String
    StateProvinceCode: String
    CountryRegionCode: String
    StateName: String
    PhoneNumber: String
    PhoneType: String
  }

  type Query {
    Persons(
      _id: String
      BusinessEntityID: String
      Title: String
      FirstName: String
      MiddleName: String
      LastName: String
      AddressLine1: String
      AddressLine2: String
      City: String
      PostalCode: String
      AddressType: String
      StateProvinceCode: String
      CountryRegionCode: String
      StateName: String
      PhoneNumber: String
      PhoneType: String
      Page: Int
    ): [Person]
  }
`;
