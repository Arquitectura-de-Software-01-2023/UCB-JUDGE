package ucb.judge.ujemail.consumer

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component
import ucb.judge.ujemail.dto.EmailDto
import ucb.judge.ujemail.dto.NotificationDto
import ucb.judge.ujemail.service.EmailService


@Component
class NotificationConsumer (private val emailService: EmailService){
    companion object {
        private val logger = LoggerFactory.getLogger(NotificationConsumer::class.java.name)
    }
    @RabbitListener (queues = ["notification2Queue"])
    fun consumeNotification(notificationDto: NotificationDto){
        logger.info("Message received at ${notificationDto.date}")
        val objectMapper = jacksonObjectMapper()
        val emailDto = objectMapper.readValue(notificationDto.message, EmailDto::class.java)
        emailService.sendEmail(emailDto.to, emailDto.subject, emailDto.body)
        logger.info("Message sent to ${emailDto.to}")
    }
}