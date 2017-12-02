FROM java:8-jre

ADD ./target/group-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/group-service.jar"]

EXPOSE 9686