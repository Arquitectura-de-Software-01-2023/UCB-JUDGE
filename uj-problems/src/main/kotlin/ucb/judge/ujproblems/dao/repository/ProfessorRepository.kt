package ucb.judge.ujproblems.dao.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ucb.judge.ujproblems.dao.Professor

@Repository
interface ProfessorRepository: JpaRepository<Professor, Long> {

    fun findByKcUuid(kcUUid: String): Professor?
}