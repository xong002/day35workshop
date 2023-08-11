#
# First stage
#
FROM maven:3.9.2-amazoncorretto-20 AS build
COPY src /home/app/src
COPY pom.xml /home/app
# ARG MONGODBURI
RUN mvn -f /home/app/pom.xml clean package
#
# second stage
#
FROM maven:3.9.2-amazoncorretto-20
COPY --from=build /home/app/target/day35workshop-0.0.1-SNAPSHOT.jar /usr/local/lib/day35workshop.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/day35workshop.jar"]