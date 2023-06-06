package ucb.judge.ujfileuploader.bl

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import ucb.judge.ujfileuploader.dao.S3Object
import ucb.judge.ujfileuploader.dao.repository.S3ObjectRepository
import ucb.judge.ujfileuploader.dto.FileDto
import ucb.judge.ujfileuploader.service.MinioService

@Service
class FilesBl constructor(
    private val minioService: MinioService,
    private val s3ObjectRepository : S3ObjectRepository
) {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(FilesBl::class.java)
    }

    fun uploadFile(file: MultipartFile, bucket: String, customFilename: Boolean): FileDto {
        // upload to minio
        logger.info("Uploading file to minio")
        logger.info("filename: ${file.originalFilename}")
        val newFile = minioService.uploadFile(file, bucket, customFilename)
        // store in database
        logger.info("Storing file metadata in database")
        val s3Object = S3Object(
            filename = newFile.filename,
            bucket = newFile.bucket,
            contentType = newFile.contentType,
            status = true
        )
        val savedS3Object = s3ObjectRepository.save(s3Object)
        return FileDto(
            s3ObjectId = savedS3Object.s3ObjectId!!,
            contentType = savedS3Object.contentType!!,
            bucket = savedS3Object.bucket!!,
            filename = savedS3Object.filename!!,
            status = savedS3Object.status
        )
    }
}