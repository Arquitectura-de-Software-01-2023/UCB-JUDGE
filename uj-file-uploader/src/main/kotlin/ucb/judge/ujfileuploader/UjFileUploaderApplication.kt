package ucb.judge.ujfileuploader

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient

@SpringBootApplication
@EnableEurekaClient
class UjFileUploaderApplication

fun main(args: Array<String>) {
	runApplication<UjFileUploaderApplication>(*args)
}
