package ucb.judge.ujfileuploader.dto

data class NewFileDto (
    val filename: String,
    val bucket: String,
    val contentType: String
)