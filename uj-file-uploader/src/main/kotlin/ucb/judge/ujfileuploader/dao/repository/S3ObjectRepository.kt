package ucb.judge.ujfileuploader.dao.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ucb.judge.ujfileuploader.dao.S3Object

@Repository
interface S3ObjectRepository : JpaRepository<S3Object, Long> {
}