package com.example.rms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDto {

    private Long propertyId;
    private String propertyName;
    private String propertyType;
    private String address;
    private double size;
    private double price;
    private String occupancyStatus;
    private Date closingDate;
    private String depositPaymentTerms;
    private String description;
    private byte[] propertyImage;
    private String createdBy;
    private boolean sold;
}
