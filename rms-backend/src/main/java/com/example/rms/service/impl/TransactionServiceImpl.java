package com.example.rms.service.impl;

import com.example.rms.dto.TransactionDto;
import com.example.rms.entity.Property;
import com.example.rms.entity.Transaction;
import com.example.rms.mapper.TransactionMapper;
import com.example.rms.repository.PropertyRepository;
import com.example.rms.repository.TransactionRepository;
import com.example.rms.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final PropertyRepository propertyRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, PropertyRepository propertyRepository) {
        this.transactionRepository = transactionRepository;
        this.propertyRepository = propertyRepository;
    }

    @Override
    public TransactionDto buyProperty(Long propertyId, Long clientId, Long amount) throws Exception {
        Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
        if (propertyOptional.isPresent()) {
            Property property = propertyOptional.get();

            if (property.isSold()) {
                throw new Exception("Property has already been sold");
            }

            if (property.getPrice() != amount) {
                throw new Exception("Incorrect amount provided for the property");
            }

            // Create a transaction
            Transaction transaction = new Transaction();
            transaction.setPropertyId(propertyId);
            transaction.setClientId(clientId);
            transaction.setTransactionDate(new Date());
            transaction.setTransactionAmount(amount);
            transaction.setTransactionStatus("Initiated");

            Transaction savedTransaction = transactionRepository.save(transaction);

//            Mark the property as sold
//            property.setSold(true);
//            propertyRepository.save(property);

            return TransactionMapper.maptoTransactionDto(savedTransaction);
        } else {
            throw new Exception("Property not found");
        }
    }

    @Override
    public TransactionDto completeTransaction(Long transactionId) throws Exception {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = transactionOptional.get();
            transaction.setTransactionStatus("Completed");
            transactionRepository.save(transaction);

            // Mark the property as sold
            Optional<Property> propertyOptional = propertyRepository.findById(transaction.getPropertyId());
            if (propertyOptional.isPresent()) {
                Property property = propertyOptional.get();
                property.setSold(true);
                propertyRepository.save(property);
            }

            return TransactionMapper.maptoTransactionDto(transaction);
        } else {
            throw new Exception("Transaction not found");
        }
    }

    @Override
    public List<TransactionDto> getTransactionsByClient(Long clientId) {
        List<Transaction> transactions = transactionRepository.findByClientId(clientId);
        return transactions.stream().map(TransactionMapper::maptoTransactionDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getTransactionsByProperty(Long propertyId) {
        List<Transaction> transactions = transactionRepository.findByPropertyId(propertyId);
        return transactions.stream().map(TransactionMapper::maptoTransactionDto).collect(Collectors.toList());
    }
}