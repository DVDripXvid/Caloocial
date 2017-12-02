FROM java:8-jre

ADD ./target/service-registry.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/service-registry.jar"]

EXPOSE 8761