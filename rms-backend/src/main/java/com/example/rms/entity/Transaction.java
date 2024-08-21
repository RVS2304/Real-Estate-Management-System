package com.example.rms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private Long propertyId;

    @Column(nullable = false)
    private Long clientId;

    @Column(nullable = false)
    private Date transactionDate;

    @Column(nullable = false)
    private Long transactionAmount;

    @Column(nullable = false)
    private String transactionStatus;
}