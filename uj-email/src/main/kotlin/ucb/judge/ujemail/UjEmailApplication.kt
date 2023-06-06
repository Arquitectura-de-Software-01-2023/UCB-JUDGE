package ucb.judge.ujemail

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.context.annotation.Bean
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
@EnableDiscoveryClient
class UjEmailApplication {
	@Bean
	fun converter(): Jackson2JsonMessageConverter {
		return Jackson2JsonMessageConverter()
	}
}

fun main(args: Array<String>) {
	runApplication<UjEmailApplication>(*args)
}
