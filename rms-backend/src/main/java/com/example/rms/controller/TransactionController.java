package com.example.rms.controller;

import com.example.rms.dto.TransactionDto;
import com.example.rms.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @PostMapping("/buy")
    public TransactionDto buyProperty(@RequestBody TransactionDto transactionDto) throws Exception {
        return transactionService.buyProperty(
                transactionDto.getPropertyId(),
                transactionDto.getClientId(),
                transactionDto.getTransactionAmount()
        );
    }

    @PostMapping("/complete/{transactionId}")
    public TransactionDto completeTransaction(@PathVariable Long transactionId) throws Exception {
        return transactionService.completeTransaction(transactionId);
    }

    @GetMapping("/by-buyer/{clientId}")
    public List<TransactionDto> getTransactionsByClient(@PathVariable Long clientId) {
        return transactionService.getTransactionsByClient(clientId);
    }

    @GetMapping("/by-property/{propertyId}")
    public List<TransactionDto> getTransactionsByProperty(@PathVariable Long propertyId) {
        return transactionService.getTransactionsByProperty(propertyId);
    }
}