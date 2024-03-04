package com.webservice.billingservice.repositories;

import com.webservice.billingservice.entities.Bill;
import com.webservice.billingservice.entities.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;

@RepositoryRestResource
public interface BillRepository extends JpaRepository<Bill, Long> {

}
