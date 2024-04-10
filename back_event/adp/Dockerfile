# Use the official OpenJDK image as a base image
FROM openjdk:11-jre-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/your-spring-boot-app.jar /app/app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
