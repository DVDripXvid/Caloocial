FROM java:8-jre

ADD ./target/event-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/event-service.jar"]

EXPOSE 2121