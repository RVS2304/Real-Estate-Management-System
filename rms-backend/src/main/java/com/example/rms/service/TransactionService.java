package com.example.rms.service;

import com.example.rms.dto.TransactionDto;

import java.util.List;

public interface TransactionService {

    TransactionDto buyProperty(Long propertyId, Long clientId, Long amount) throws Exception;

    List<TransactionDto> getTransactionsByClient(Long clientId);

    List<TransactionDto> getTransactionsByProperty(Long propertyId);

    TransactionDto completeTransaction(Long transactionId) throws Exception;

}