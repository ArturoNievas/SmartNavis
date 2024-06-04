package com.hexacore.smartnavis_api.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthDetailService {
    UserDetailsService userDetailsService();
}
