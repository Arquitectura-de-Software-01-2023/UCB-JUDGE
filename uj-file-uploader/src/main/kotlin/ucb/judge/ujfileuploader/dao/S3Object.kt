package ucb.judge.ujfileuploader.dao

import javax.persistence.*

@Entity
@Table(name = "s3_object")
class S3Object {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s3_object_id")
    var s3ObjectId: Long? = null

    @Column(name = "content_type")
    var contentType: String? = "application/octet-stream"

    @Column(name = "bucket")
    var bucket: String? = null

    @Column(name = "filename")
    var filename: String? = null

    @Column(name = "status")
    var status: Boolean = true

    constructor(contentType: String, bucket: String, filename: String, status: Boolean) {
        this.contentType = contentType
        this.bucket = bucket
        this.filename = filename
        this.status = status
    }

}