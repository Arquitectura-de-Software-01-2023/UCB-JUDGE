package ucb.judge.ujfileuploader.api


import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import ucb.judge.ujfileuploader.bl.FilesBl
import ucb.judge.ujfileuploader.dto.FileDto
import ucb.judge.ujfileuploader.dto.ResponseDto

@RestController
@RequestMapping("/api/v1/files")
class FilesController constructor(
    private val filesBl: FilesBl
){
    companion object {
        val logger: Logger = LoggerFactory.getLogger(FilesController::class.java)
    }

    @PostMapping
    fun uploadFile(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("bucket") bucket: String,
        @RequestParam("customFilename", required = false) customFilename: Boolean = false,
    ): ResponseEntity<ResponseDto<FileDto>>{
        logger.info("POST /api/v1/files")
        val fileDto = filesBl.uploadFile(file, bucket, customFilename)
        logger.info("Sending response")
        return ResponseEntity.ok(ResponseDto(data = fileDto, message = "File uploaded successfully", successful = true))
    }
}