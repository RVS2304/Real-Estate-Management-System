package com.example.rms.dto;

import com.example.rms.entity.InteractionType;
import com.example.rms.entity.Property;
import com.example.rms.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InteractionDto {

    private Long interactionId;
    private Long clientId;
    private Long agentId;
    private Long propertyId;
    private InteractionType interactionType;
    private String interactionText;
    private LocalDateTime interactionDate;
}
