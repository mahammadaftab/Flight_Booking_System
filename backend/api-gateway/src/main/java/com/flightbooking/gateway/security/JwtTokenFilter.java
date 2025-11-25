package com.flightbooking.gateway.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class JwtTokenFilter implements WebFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        try {
            String jwt = parseJwt(exchange);
            if (jwt != null && jwtTokenProvider.validateJwtToken(jwt)) {
                String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);

                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(username, null, null);

                return chain.filter(exchange)
                    .contextWrite(ReactiveSecurityContextHolder.withSecurityContext(
                        Mono.just(new SecurityContextImpl(authentication))));
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        return chain.filter(exchange);
    }

    private String parseJwt(ServerWebExchange exchange) {
        String headerAuth = exchange.getRequest().getHeaders().getFirst("Authorization");

        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}