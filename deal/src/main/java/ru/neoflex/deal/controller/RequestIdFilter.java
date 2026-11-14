package ru.neoflex.deal.controller;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.MDC;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import jakarta.servlet.Filter;

@Slf4j
@Component
public class RequestIdFilter implements Filter {
    private static final String REQUEST_ID_MDC_KEY = "requestId";

    private static final List<String> IGNORED_PATHS = List.of(
            "/swagger-ui",
            "/swagger-ui.html",
            "/v3/api-docs",
            "/swagger-resources",
            "/webjars",
            "/favicon.ico"
    );

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI();
        boolean shouldLog = IGNORED_PATHS.stream().noneMatch(path::startsWith);

        if (shouldLog) {
            log.info("=== НАЧАЛО ЗАПРОСА: {} {} ===",
                    httpRequest.getMethod(), httpRequest.getRequestURI());
        }
        String requestId = UUID.randomUUID().toString();
        MDC.put(REQUEST_ID_MDC_KEY, requestId);
        try {
            chain.doFilter(request, response);
        } finally {
            if (shouldLog) {
                log.info("=== КОНЕЦ ЗАПРОСА: {} {} (статус: {}) ===",
                        httpRequest.getMethod(),
                        httpRequest.getRequestURI(),
                        httpResponse.getStatus());
            }
            MDC.clear();
        }
    }
}
