package com.example.rms.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {

    private Long transactionId;
    private Long propertyId;
    private Long clientId;
    private Date transactionDate;
    private Long transactionAmount;
    private String transactionStatus;
}