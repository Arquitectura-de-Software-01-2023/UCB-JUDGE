package ucb.judge.ujproblems.dao

import javax.persistence.*

@Entity
@Table(name = "professor")
class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "professor_id")
    var professorId: Long = 0;

    @Column(name = "kc_uuid")
    var kcUuid: String = "";

    @Column(name = "status")
    var status: Boolean = true;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "professor")
    var problems: List<Problem>? = null;
}