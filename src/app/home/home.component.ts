import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { QuestionService } from '../services/question.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions = [];
  deleteForm: FormGroup;
  createForm: FormGroup;
  updateForm: FormGroup;
  logoutForm: FormGroup;
  selectedQuestion: number;
  showQuestion: number;

  constructor(
    private authService: AuthenticationService,
    private questService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userDetails().subscribe((res) => {
      if (res===null) {
        this.router.navigate(['login']);
      } else {
        console.log(res);
      }
    }, err => {
      console.log('err ', err);
    });

    this.questions = this.questService.listQuestions();

    this.deleteForm = this.formBuilder.group({
      deleteChoice: new FormControl('', Validators.required)
    });

    this.createForm = this.formBuilder.group({
      questionLabel: new FormControl('', Validators.required),
      answerField1: new FormControl('', Validators.required),
      answerField2: new FormControl('', Validators.required),
      answerField3: new FormControl('', Validators.required),
      answerField4: new FormControl('', Validators.required),
      goodAnswer: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required)
    });

    this.updateForm = this.formBuilder.group({
      questionLabel: new FormControl(''),
      answerField1: new FormControl(''),
      answerField2: new FormControl(''),
      answerField3: new FormControl(''),
      answerField4: new FormControl(''),
      goodAnswer: new FormControl(''),
      difficulty: new FormControl('')
    });

    this.logoutForm = this.formBuilder.group({});
  }

  deleteQuestion(index) {
    this.questService.deleteQuestion(index);
  }

  createQuestion(value) {
    let newQuestion = {};
    newQuestion['question'] = value['questionLabel'];
    newQuestion['answer1'] = value['answerField1'];
    newQuestion['answer2'] = value['answerField2'];
    newQuestion['answer3'] = value['answerField3'];
    newQuestion['answer4'] = value['answerField4'];
    newQuestion['difficulty'] = value['difficulty'];
    newQuestion['goodAnswer1'] = (value['goodAnswer'] === 'answer1');
    newQuestion['goodAnswer2'] = (value['goodAnswer'] === 'answer2');
    newQuestion['goodAnswer3'] = (value['goodAnswer'] === 'answer3');
    newQuestion['goodAnswer4'] = (value['goodAnswer'] === 'answer4');
    this.questService.createQuestion(newQuestion);
  }

  showQuestionDetails(index) {
    this.showQuestion = index;
  }

  updateDetails(value, index) {
    let newQuestion = {};
    newQuestion['question'] = value['questionLabel'];
    newQuestion['answer1'] = value['answerField1'];
    newQuestion['answer2'] = value['answerField2'];
    newQuestion['answer3'] = value['answerField3'];
    newQuestion['answer4'] = value['answerField4'];
    newQuestion['difficulty'] = value['difficulty'];
    newQuestion['goodAnswer1'] = (value['goodAnswer'] === 'answer1');
    newQuestion['goodAnswer2'] = (value['goodAnswer'] === 'answer2');
    newQuestion['goodAnswer3'] = (value['goodAnswer'] === 'answer3');
    newQuestion['goodAnswer4'] = (value['goodAnswer'] === 'answer4');
    this.questService.updateQuestion(newQuestion, index);
  }

  logout() {
    this.authService.logoutUser()
      .then((res) => {
        this.router.navigate(['login']);
      });
  }
}
