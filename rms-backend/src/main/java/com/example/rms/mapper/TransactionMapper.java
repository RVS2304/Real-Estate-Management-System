package com.example.rms.mapper;

import com.example.rms.dto.TransactionDto;
import com.example.rms.entity.Transaction;

public class TransactionMapper {

    public static TransactionDto maptoTransactionDto(Transaction transaction) {
        return new TransactionDto(
                transaction.getTransactionId(),
                transaction.getPropertyId(),
                transaction.getClientId(),
                transaction.getTransactionDate(),
                transaction.getTransactionAmount(),
                transaction.getTransactionStatus()
        );
    }

    public static Transaction maptoTransaction(TransactionDto transactionDto) {
        return new Transaction(
                transactionDto.getTransactionId(),
                transactionDto.getPropertyId(),
                transactionDto.getClientId(),
                transactionDto.getTransactionDate(),
                transactionDto.getTransactionAmount(),
                transactionDto.getTransactionStatus()
        );
    }
}
