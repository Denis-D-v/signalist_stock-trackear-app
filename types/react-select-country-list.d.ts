declare module "react-select-country-list" {
  export type ReactSelectCountryListItem = {
    value: string
    label: string
  }

  const countryList: () => {
    getData: () => ReactSelectCountryListItem[]
  }

  export default countryList
}

