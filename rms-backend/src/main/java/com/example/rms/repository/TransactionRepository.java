package com.example.rms.repository;

import com.example.rms.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByClientId(Long clientId);
    List<Transaction> findByPropertyId(Long propertyId);

}
