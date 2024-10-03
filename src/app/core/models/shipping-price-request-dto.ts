export interface ShippingPriceRequestDto {
    from_district_id: number,
    from_ward_code: string,
    service_id: number,
    to_district_id: number,
    to_ward_code: string,
    weight: number
}