import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStudent } from '@/shared/model/student.model';
import StudentService from './student.service';

@Component
export default class StudentDetails extends Vue {
  @Inject('studentService') private studentService: () => StudentService;
  public student: IStudent = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.studentId) {
        vm.retrieveStudent(to.params.studentId);
      }
    });
  }

  public retrieveStudent(studentId) {
    this.studentService()
      .find(studentId)
      .then(res => {
        this.student = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
