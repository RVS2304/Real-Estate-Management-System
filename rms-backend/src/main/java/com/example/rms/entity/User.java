package com.example.rms.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @Column(unique = true, nullable = false, length = 20)
    private String username;

    @Column(unique = true, nullable = false, length = 30)
    private String email;

    @Column(nullable = false, length = 20)
    private String password;

    @Column(unique = true, nullable = false, length = 10)
    private String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ROLE role;

//    user_id int auto_increment primary key,
//    username varchar(50) unique not null,
//    password varchar(255) not null,
//    role enum('admin', 'agent', 'client') not null,
//    email varchar(100) unique,
//    contact_number varchar(15),
//    created_at timestamp default current_timestamp,
//    updated_at timestamp default current_timestamp on update current_timestamp

}
