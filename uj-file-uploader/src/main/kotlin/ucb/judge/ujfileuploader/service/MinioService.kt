package ucb.judge.ujfileuploader.service

import io.minio.MinioClient
import io.minio.PutObjectArgs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import ucb.judge.ujfileuploader.dto.NewFileDto
import java.util.*
import kotlin.math.log

@Service
class MinioService constructor(
    private val minioClient: MinioClient
) {
    @Value("\${minio.url}")
    private lateinit var minioUrl: String

    fun uploadFile(file: MultipartFile, bucket: String, customFilename: Boolean): NewFileDto {
        // file name
        val filename: String = if (customFilename) {
            file.originalFilename!!
        } else {
            "${UUID.randomUUID()}.${file.originalFilename!!.split(".").last()}"
        }

        // save object
        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucket)
                .`object`(filename)
                .stream(file.inputStream, file.size, -1)
                .contentType(file.contentType)
                .build()
        )
        return NewFileDto(filename, bucket, file.contentType ?: "application/octet-stream")
    }

}