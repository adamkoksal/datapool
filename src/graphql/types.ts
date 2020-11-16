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
    EmailAddress: String
  }

  input Field {
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
    EmailAddress: String
  }

  type Query {
    persons(
      _id: String
      page: Int
      fields: Field
    ): [Person]

    getCount(
      fields: Field
    ): Int
  }
`;
